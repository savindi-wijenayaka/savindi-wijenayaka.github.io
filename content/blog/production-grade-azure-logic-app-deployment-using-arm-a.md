---
title: "Production grade Azure Logic App deployment using ARM templates: A comprehensive guide"
slug: "production-grade-azure-logic-app-deployment-using-arm-a"
date: "2021-11-30"
excerpt: "Kia Ora Techies! I recently worked on an Azure based solution which included a Logic App that communicates with few other Azure services…"
tags: []
source: "medium"
mediumUrl: "https://medium.com/@savindi-wijenayaka/production-grade-azure-logic-app-deployment-using-arm-templates-a-comprehensive-guide-76b2155fbaff"
featured: false
readingTime: 12
convertedAt: "2026-04-27T02:49:59Z"
coverImage: "/assets/blog/production-grade-azure-logic-app-deployment-using-arm-a.jpeg"
---

Kia Ora Techies! I recently worked on an Azure based solution which included a Logic App that communicates with few other Azure services. Developing the Logic App in the portal and integrating it with other Azure services using API connections was a pretty straight forward task. But the real challenge comes when we do this in production, where we have to put forth lots of measures with respect to security, CI/CD and deploying to multiple environments. So in today’s article, I am going to discuss how we did it and what are the hurdles we encountered.

***Content lineup:***

1. Usecase we are tackling
2. Creating the Logic App in the Portal
3. Exporting ARM templates
4. Parameterizing ARM templates
5. ARM templates for API connection authorized with Service Principal
6. ARM templates for API connection authorized with connection strings
7. Putting together all resources
8. Validating the ARM template
9. CI/CD with ARM templates
10. Final thoughts

Lets dive right in!

### 1. Usecase we are tackling

Since I want to explain authorization process using both service principal and connection string, we will take a simple logic app which triggers every 30 minute to query data from Log Analytics Workspace (authorized via a Service Principal) and send the query result to an Eventhub (authorized via a Connection string).

![](https://cdn-images-1.medium.com/max/800/1*ixAsSQ38QgbvZzecr2y8EQ.png)

Figure 1: Architecture of the usecase (Source: *Image by author)*

In an ARM template, each of these three elements will have its separate resource definition.

Prerequisites:

1. A Log Analytics Workspace with data
2. An Eventhub with send access policy
3. A Service Principal with access to Log Analytics Workspace
4. An Azure Key vault to hold sensitive information

### 2. Creating the Logic App in the Portal

Creating the Logic app in the portal, using the designer view, is the easiest way to get the initial ARM template for our Logic App. So lets go ahead and do that. However, since it is pretty much straight forward and not our focus for today, I won’t go into details.

To explain it briefly, start with a blank template and add a recurrent trigger of 30 minutes. Then add `Azure Monitor Logs` connector’s `Run query and list results` action. You will be prompted to authorize the connector. In here, you can add all details related to your service principal and create a new connection. Fill in all the details related to the Log Analytics Workspace and add the Kusto query that you want to run against it. Next, add `Event hubs` connector’s `Send event` action. Authorize the connection to send events to your Eventhub. Now your logic app designer view should look something like bellow:

![](https://cdn-images-1.medium.com/max/800/1*f-iS1_NxoCNGoCa9iIHFsw.png)

Figure 2: Designer View of the implemented logic app (Source: *Image by author)*

I want to highlight one important thing. In the portal, you don’t have to explicitly create API connections. When you use a connector, it automatically create the API connection with the authorization you provided. But in ARM template, you will have to include steps for this.

### 3. Exporting ARM templates

This again is a straight forward step. In the left navigation panel, there is an option called `Export template` under the section `Automation`. Tick the `Include parameters` check box, and click `Download`. This gives you the structure for your logic app.

Next, lets see how we can obtain the API connections’ initial ARM templates. In the left navigation panel, go to the `API connections` option under `Development Tools` section. You will see both API connections that were automatically created when you created the above Logic App. Click on one of them and similar to the Logic App, you will find the `Export template` option in the left plane of the inner window that it spawns.

![](https://cdn-images-1.medium.com/max/800/1*5l5jE9M5BgywR1C-gX_PHA.png)

Figure 3: Export option for API Connections in the portal (Source: *Image by author)*

Now we have all the building blocks that we need to create the final ARM template. Now, lets go to the most important section in this Article.

### 4. Parameterizing ARM templates

When you look at your exported ARM templates you may notice there are two main files for each resource; `template.json` and `parameter.json`. The `template.json` is used to set out the structure of the resources while the `parameter.json` is used to override parameters in the `template.json` with respect to each environment.

Here is the file naming convention to use (not a must though): [[1]](https://docs.microsoft.com/en-us/azure/logic-apps/logic-apps-azure-resource-manager-templates-overview#template-parameters-file)

- Logic app template file name: `<logic-app-name>.json`
- Parameters file name: `<logic-app-name>.parameters.json`

#### Parameter Types

There are two main types of Parameters:

1. ***Template parameters***: Evaluated at Deployment time

Template parameters can be used to pass all the environment specific information. For example, if you have separate subscription for each environment, not only plain text information like subscription id, resource group will change in each environment, but also key vault based values like client secrets, connection strings, etc. So in this case we have to definitely use them as template parameters and override them via `parameter.json` of each environment’s deployment pipeline.

2. ***Workflow definition parameters***: Evaluated at Runtime

In your ARM template, per resource, there is a special section called “Workflow definition”, where you have all the core logic of that particular resource. In there, you might have values that you want to reuse throughout your resource without hard-coding or there might be values that change often, which makes it easy for them to be defined in one place. Or else you could use these parameters to pass environment specific values of the template parameters, into the workflow definition. Important thing to note is, you must define these parameters first before you can reference these parameters elsewhere in your workflow definition.

Let’s look at a Template JSON to understand this:

![](https://cdn-images-1.medium.com/max/800/1*deds64R6oWho_VLX2T81dw.png)

Figure 3: Types of parameters in ARM templates and where they resides (Source: *Image by author)*

> As a best practice, we don’t directly reference template parameters, which are evaluated at deployment, from inside the workflow definition. Instead, we should declare a workflow definition parameter, which we can then set in the `parameters` object that's *outside* your workflow definition but still *inside* your logic app's resource definition. [[2]](https://docs.microsoft.com/en-us/azure/logic-apps/logic-apps-azure-resource-manager-templates-overview#workflow-definition-and-parameters)

#### Accessing each parameter type in workflow definition [[3]](https://docs.microsoft.com/en-us/azure/logic-apps/logic-apps-azure-resource-manager-templates-overview#references-to-parameters)

***Template parameters:***

To reference template parameters, you can use template expressions with template functions.[[4]](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/template-functions), which are evaluated at deployment. Template expressions use square brackets ([]):

`"<attribute-name>": "[parameters('<template-parameter-name>')]"`

Accessing objects: [[5]](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/parameters#objects-as-parameters)
 `"<attribute-name>": "[parameters('<template-parameter-name>').<property-name>]"`

***Workflow definition parameters:***

To reference workflow definition parameters, you can use Workflow Definition Language expressions and functions [[6]](https://docs.microsoft.com/en-us/azure/logic-apps/workflow-definition-language-functions-reference), which are evaluated at runtime. You might notice that some template functions and workflow definition functions have the same name. So to avoid confusion, it is better to add `template` prefix to Template Parameters. Workflow definition expressions start with the “at” symbol (@):

`"<attribute-name>": "@parameters('<workflow-definition-parameter-name>')"`

Accessing objects:

`"<attribute-name>": "@parameters('<workflow-definition-parameter-name>').<property-name>"` [[7]](https://docs.microsoft.com/en-us/azure/logic-apps/workflow-definition-language-functions-reference#functions-in-expressions)
 `"<attribute-name>": "@parameters('<workflow-definition-parameter-name>')[<property-name>]"` [[8]](https://docs.microsoft.com/en-us/azure/logic-apps/logic-apps-azure-resource-manager-templates-overview#full-example-template)

![](https://cdn-images-1.medium.com/max/800/1*nBZy4TyUgCW_Mrw6-4kHyg.png)

Figure 4: Accessing each parameter type in workflow definition (Source: *Image by author)*

#### Other considerations [[9]](https://docs.microsoft.com/en-us/azure/logic-apps/workflow-definition-language-functions-reference#considerations-for-using-functions)

- Function parameters are evaluated from left to right.
- In the syntax for parameter definitions, a question mark (?) that appears after a parameter means the parameter is optional.
- Function expressions that appear inline with plain text require enclosing curly braces ({}) to use the expression’s interpolated format instead. This format helps avoid parsing problems. If your function expression doesn’t appear inline with plain text, no curly braces are necessary. For example, if you use a numerical output where string input is expected, such as a URL, Logic Apps automatically converts the value into a string by using the curly braces ({}) notation [[10]](https://docs.microsoft.com/en-us/azure/logic-apps/workflow-definition-language-functions-reference#implicit-data-type-conversions). So in short, the curly braces can perform implicit casting in ARM templates.

#### Parameterizing Connection Details

In the Logic app’s workflow definition parameters section, you can see a special parameter called `$connections`. Its value contains comma separated json objects containing details of each API connection. The details are `connectionId`, `connectionName` and `id`. Sometimes the `connectionId` might be assigned with a template parameter with the suffix `external_id`. Even so, both the connectionId and the id values in the portal exported ARM template will contain environment specific information like subscription Id and resource group. To handle this scenario, we are going to use some template parameter functions. In that case, all you have to know is the name of the API connection (this can be defined as an environment specific name via template parameter too) you want to parameterize. Below figure shows how we can use `resourceId` and `reference` [[11]](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/template-functions-resource) template functions to achieve our goal.

![](https://cdn-images-1.medium.com/max/800/1*sbXQlnOySJ59sScYX6Bl3g.png)

Figure 5: Parameterizing API connection details (Source: *Image by author)*

So using these concepts, now we can parameterize the exported Logic App ARM template.

Next, lets look at our API connections. This was actually the most challenging task I had when I was doing this project, as there were almost no docs for this part. For the two connectors, we have two types of authentication;

1. Service Principal
2. Connection String

Lets see how we can handle this elegantly.

### 5. ARM templates for API connection authorized with Service Principal

With your created service principal, you should have 3 type of information with you, namely; client ID, client secret and tenant ID. Out of them, client secret is a sensitive information. Hence, first step is to put that in your Key vault and to find its secret version.

Next, in the `template.json`, under the template parameter section and the `resource.properties.parameterValues`, add the details related to Service Principal:

![](https://cdn-images-1.medium.com/max/800/1*iGFckgy65TS1_7UvQ22AZw.png)

Figure 6: Adding service principal related details in `template.json` (Source: *Image by author)*

You can use any name you prefer as template parameter names. You can avoid setting default values if you prefer. But the import part in here is the way parameters are specified in the `parameterValues` section, with `token:` prefix

Then in the `parameters.json`, pass the parameters specific to the environment you are deploying the API connection

![](https://cdn-images-1.medium.com/max/800/1*Vu-d-klj_UjyYFhRkqxxhA.png)

Figure 7: Adding service principal related details in parameter.json (Source: *Image by author)*

There is one other place you have to parameterize in the API connection ARM template. That is `properties.api.id`.

```
"id": "[concat('/subscriptions/', parameters('subscription_id'), '/providers/Microsoft.Web/locations/', parameters('resource_location'), '/managedApis/eventhubs')]"
```

If you do not have the subscription Id and the resource location being parameterized, the I would suggest using `subscription().subscriptionId` and `resourceGroup().location` respectively in those places.

Now lets look at connection string based API connection creation using the ARM template.

### 6. ARM templates for API connection authorized with connection strings

Similar to what we did in the above section, first add the connection string to the Azure Key Vault. Next in the `template.json`, under the template parameter section and the `resource.properties.parameterValues`, add the details related to connection string. Then we can use the parameter.json to access the Key vault (similar to how it is done in Service Principal’s client secret) and grab the connection string. Only difference in here is the key used in the `parameterValues` section.

```
"parameterValues": {
    "connectionString": "[parameters('eventhub_connection_string')]"
}
```

Don’t forget to parameterize the `properties.api.id` as well.

So with this, we can wrap up the API connection creation part.

### 7. Putting together all resources

Since we parameterized three separate ARM templates we downloaded from the portal, now it is time to combine them all to one single ARM template. Lets take the Logic App’s ARM template and modify it to contain all resources.

First in the template parameter section, add template parameters of other two ARM templates. Check if there are conflicting names and whether all template parameter names have a common tone to it.

Next copy the resource objects from API connection ARM templates and add them to the Logic App ARM template’s resource array. Finally, add `dependsOn` [[12]](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/template-tutorial-create-templates-with-dependent-resources?tabs=CLI) key to the Logic App resource object and specify the value to be an array of `connectionId` of each API connections.

```
"dependsOn": [
     "[resourceId('Microsoft.Web/connections', parameters('azuremonitorlogs_name'))]",
     "[resourceId('Microsoft.Web/connections', parameters('eventhubs_name'))]"
],
```

Structure of the final ARM template will look something like below:

![](https://cdn-images-1.medium.com/max/800/1*esgRRUzGANPhVENn6Dpong.png)

Figure 8: Structure of the final template.json (Source: *Image by author)*

### 8. Validating the ARM template

Lets see how we can validate if our parameterized ARM template have any errors. For this we are going to use “Deploy a custom template” service of Azure. First, go to Azure portal and search for it. After selecting it, in the window you get, select the “Build your own template in the editor” option

![](https://cdn-images-1.medium.com/max/800/1*8TGfPSa304TPRC9hV_Synw.png)

Figure 9: “Deploy a custom template” service (Source: *Image by author)*

Now load the file you created and populate template parameters’ default values with the actual values for your test environment. Then, save and follow the steps to deploy. If it is deployed successfully and executes well, you are good to proceed to the CI/CD step.

### 9. CI/CD with ARM templates

To deploy the ARM template you created, you can use Azure CLI [[13]](https://docs.microsoft.com/en-us/cli/azure/deployment/group?view=azure-cli-latest) in your pipeline.yaml. The specific command for this is `az deployment group create`. In each environment pipeline, use the same `template.json`, but with different `parameter.json`s which are specific for that particular environment.

However, if your pipeline is part of a larger pipeline and triggered by not only the changes in this ARM template, then it is better to run a `what if` command and see if there is a diff in the ARM template before running the `create`.

### 10. Final thoughts

Although Azure Logic Apps are very useful as an integration service, it has its own down sides. In my humble opinion, the product is not really mature enough. Let say we want to modify above usecase a bit, so that, depending on a data field received from the Log analytics (Ex: client ID) we select the eventhub partition that we want to send the data to. With Logic Apps, we cannot implement this easily. So if your usecase is complex, I would suggest to look into Azure Functions. But for simple use cases, Logic App will be the ideal.

This brings us to the end of the article. Hope it was useful for you. Let me know your thoughts in the comments below. If you encountered any issues, mention them in the comments as well. I will try my best to help you.

Until the next article, Happy coding 💻😃

#### References

[1] Azure Documentation: [Logic apps Azure resource manager templates overview: template parameters file](https://docs.microsoft.com/en-us/azure/logic-apps/logic-apps-azure-resource-manager-templates-overview#template-parameters-file)

[2] [Azure Documentation: Logic apps Azure resource manager templates overview: workflow definition and parameters](https://docs.microsoft.com/en-us/azure/logic-apps/logic-apps-azure-resource-manager-templates-overview#workflow-definition-and-parameters)

[3] Azure Documentation: [Logic apps Azure resource manager templates overview: references to parameters](https://docs.microsoft.com/en-us/azure/logic-apps/logic-apps-azure-resource-manager-templates-overview#references-to-parameters)

[4] Azure Documentation: [ARM Template functions](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/template-functions)

[5] Azure Documentation: [Objects as parameters](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/parameters#objects-as-parameters)

[6] Azure Documentation: [Reference guide to using functions in expressions for Azure Logic Apps and Power Automate](https://docs.microsoft.com/en-us/azure/logic-apps/workflow-definition-language-functions-reference)

[7] Azure Documentation: [Functions in expressions](https://docs.microsoft.com/en-us/azure/logic-apps/workflow-definition-language-functions-reference#functions-in-expressions)

[8] Azure Documentation: [Logic apps Azure resource manager templates overview: full example template](https://docs.microsoft.com/en-us/azure/logic-apps/logic-apps-azure-resource-manager-templates-overview#full-example-template)

[9] Azure Documentation: [Considerations for using functions](https://docs.microsoft.com/en-us/azure/logic-apps/workflow-definition-language-functions-reference#considerations-for-using-functions)

[10] Azure Documentation: [Implicit data type conversions](https://docs.microsoft.com/en-us/azure/logic-apps/workflow-definition-language-functions-reference#implicit-data-type-conversions)

[11] Azure Documentation: [Resource functions for ARM templates](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/template-functions-resource)

[12] Azure Documentation: [Create ARM templates with dependent resources](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/template-tutorial-create-templates-with-dependent-resources?tabs=CLI)
