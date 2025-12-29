"use client";
import {
  Box,
  Container,
  Heading,
  List,
  Separator,
  Tabs,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function Experiences() {
  const isMobile = useBreakpointValue({
    lg: false,
    md: true,
    sm: true,
    base: true,
  });
  return (
    <Container p={4} maxW="5xl">
      <Heading as="h1">Experience</Heading>
      <Tabs.Root
        defaultValue="wso2"
        variant="outline"
        orientation={isMobile ? "horizontal" : "vertical"}
        fitted={true}
        size="sm"
      >
        <Tabs.List>
          <Tabs.Trigger value="uoa">University of Auckland</Tabs.Trigger>
          <Tabs.Trigger value="wso2">WSO2</Tabs.Trigger>
          <Tabs.Trigger value="pearson">Pearson</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="uoa">
          <Box p={4}>
            <Heading p={3}>PhD Researcher / ML Engineer</Heading>
            <Separator p={3}></Separator>
            <List.Root
              lineHeight={2}
              fontWeight="light"
              fontSize={"sm"}
              color="brand.fgMuted"
              p={4}
              paddingTop={0}
            >
              <List.Item>
                PhD in Bioengineering, focusing on interdisciplinary research
                combining medical imaging, computational quantification, and
                deep learning-based analysis.
              </List.Item>
              <List.Item>
                Developed deep learning models for medical image analysis and
                computational quantification of physiological parameters.
              </List.Item>
            </List.Root>
            <Text p={4} paddingTop={0} fontSize={"sm"} fontFamily={"heading"}>
              Tech stack: Python, Deep Learning, Medical Imaging
            </Text>
          </Box>
        </Tabs.Content>

        <Tabs.Content value="wso2">
          <Box p={4}>
            <Heading p={3}>Machine Learning Engineer</Heading>
            <Separator p={3}></Separator>
            <List.Root
              lineHeight={2}
              fontWeight="light"
              fontSize={"sm"}
              color="brand.fgMuted"
              p={4}
              paddingTop={0}
            >
              <List.Item>
                WSO2 is one of the world&apos;s leading open-source integration
                vendors. Choreo is its latest product, providing an AI-enhanced
                integrated platform as a service.
              </List.Item>
              <List.Item>
                Researched, engineered and deployed the initial phase of
                Choreo&apos;s AI-assisted testing feature, using Python, Keras,
                Flask, Kubernetes and Azure DevOps pipelines.
              </List.Item>
              <List.Item>
                Architected, developed and deployed Choreo&apos;s AI-based
                anomaly detector with two other engineers, using Azure
                solutions, Ballerina, and Python, while adhering to security
                best practices, scaling requirements, and optimised resource
                usage.
              </List.Item>
              <List.Item>
                Analysed Ballerina Language Server performance and identified
                the cause of a memory leak using JMeter and Eclipse Memory
                Analyser (MAT), which helped in the optimisation of resources in
                Choreo.
              </List.Item>
              <List.Item>
                Contributed to automating the performance testing of Choreo by
                creating a library and a pipeline for system metrics collection
                using Python, Kusto, Seaborn, and Azure DevOps pipelines.
              </List.Item>
            </List.Root>
            <Text p={4} paddingTop={0} fontSize={"sm"} fontFamily={"heading"}>
              Tech stack: Python, Azure, Kubernetes, Ballerina
            </Text>
          </Box>
        </Tabs.Content>

        <Tabs.Content value="pearson">
          <Box p={4}>
            <Heading p={3}>Software Engineer Intern</Heading>
            <Separator p={3}></Separator>
            <List.Root
              lineHeight={2}
              fontWeight="light"
              fontSize={"sm"}
              color="brand.fgMuted"
              p={4}
              paddingTop={0}
            >
              <List.Item>
                Contributed to the development of educational software solutions
                at Pearson.
              </List.Item>
            </List.Root>
            <Text p={4} paddingTop={0} fontSize={"sm"} fontFamily={"heading"}>
              Tech stack: Java, Spring Boot, React
            </Text>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Container>
  );
}
