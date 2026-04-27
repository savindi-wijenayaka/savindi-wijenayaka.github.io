---
title: "Print to “PRE-PRINTED” set of forms using Jasper Reports without a Database, in Java"
slug: "print-to-pre-printed-set-of-forms-using-jasper-reports-a-in"
date: "2019-06-29"
excerpt: "Hola Readers!"
tags: []
source: "medium"
mediumUrl: "https://medium.com/@savindi-wijenayaka/print-to-pre-printed-set-of-forms-using-jasper-reports-without-a-database-in-java-7a6837f9a426"
featured: false
readingTime: 9
convertedAt: "2026-04-27T02:49:59Z"
coverImage: "/assets/blog/print-to-pre-printed-set-of-forms-using-jasper-reports-a-in.png"
---

Hola Readers!

Today’s story is like this: I got a requirement where I need to [read an Excel file](https://javarevisited.blogspot.com/2015/06/how-to-read-write-excel-file-java-poi-example.html) containing a table of data using Java. After that, I have to print this on a ***pre-printed*** form, as one Data Row (Record) in one form.

I hope the scenario is clear. Here, the main challenges are:

1. The **placement** or the **layout** of fields in each record, correctly in the pre-printed form, as that form has small boxes for those fields to be printed in.
2. The requirement specified that “the system should be as simple as possible” i.e. I cannot use a Database!
3. Only data in one row should be printed in one form. (Like in Mail Merge of MS Word). So if I have 50 rows in the Excel sheet, I need to create 50 forms using the same template, one form per one row. But, I need all 50 in one PDF, a PDF with 50 pages.

In this post, I won’t go into much details about [Reading from Excel part](https://www.java67.com/2014/09/how-to-read-write-xlsx-file-in-java-apache-poi-example.html), for two reasons: One, I can not disclose my code without the client’s approval; Two, there are very good tutorials already available. However, I’ll describe what technologies I used and important considerations in them.

### Reading data from an Excel Sheet

Undoubtedly, the best possible alternative to use for reading an Excel Sheet in Java is using [Apache POI](https://poi.apache.org/).

> Apache POI provides pure Java libraries for reading and writing files in Microsoft Office formats, such as Word, PowerPoint, and Excel.

You can find a really good tutorial on many aspects, in [HowToDoInJava](https://howtodoinjava.com/library/readingwriting-excel-files-in-java-poi-tutorial/).

I have used poi-4.0.1 version. I also needed poi-ooxml-4.0.1. The important thing to notice is you have to have the same version for these jars (dependencies). Else, it will throw an Exception.

Since I cannot disclose the codes without my client’s acknowledgment, I’ll tell some important points that were not discussed in HowToDoInJava.

#### Read a Value without hard coding its type

We cannot just use .toString() method on a cell to get its value since the cell type can be String, Numeric, Formula, etc. Sometimes they even can be Blank. So we have to build custom logic to check this cell type and handle accordingly. We can use `org.apache.poi.ss.usermodel.CellType` for that.

Bellow code is an example of how you can build your custom logic. Check [Apache official site](https://poi.apache.org/apidocs/dev/org/apache/poi/ss/usermodel/CellType.html) for more `CellTypes`.

> Note: This code is written in version 4.1. Versions below that will have something like `Cell.CELL_TYPE_BLANK` instead of `BLANK`

```
private  String validate(Cell cell){
   switch (cell.getCellType()) {
      case NUMERIC:
          return Integer.valueOf(cell.getNumericCellValue());
      case STRING:
          return cell.getStringCellValue();
      case FORMULA:
          return Integer.valueOf(cell.getNumericCellValue());
      case BLANK:
          return "";
      default:
          return "";
    }
}
```

#### Check whether a cell is Empty

Sometimes we may get a requirement to check whether a Cell is empty or not to proceed with some logic. The best possible `isCellEmpty()` method we can write is as follows:

```
public  boolean isCellEmpty(Cell cell) {
   if (cell == null) {
       return true;
   }
```

```
if (cell.getCellType() == CellType.BLANK) {
       return true;
   }
```

```
if (cell.getCellType() == CellType.STRING &&      cell.getStringCellValue().trim().isEmpty()) {
       return true;
   }
```

```
return false;
}
```

Assume my Excel table contains 3 columns.

1. registration\_number
2. student\_name
3. course\_fee

When I read each row, I take them as 3 temporary variables with the same names.

So in a nutshell, per each row I read from Excel, I create above mentioned 3 variables, in [Loop Scope](https://www.baeldung.com/java-variable-scope).

All Done! Let's move to the hardest part.

### Filling data to fit in a Pre-Printed form

I have come across a few ways to achieve this requirement. Out of them, two was most significant.

1. Jasper Reports
2. Apache PDFBox

As PDFBox requires us to specify coordinates of where each variable should print, it was bit hard way to go ahead.

On the other hand, Jasper Reports give the capability of designing the form with drag and drop, using a designer view.

So my obvious choice had been Jasper Reports.

Let's see how we can achieve our requirement now. Remember that I mentioned before, we cannot use databases.

In Jasper reports, there are many alternative [data sources](https://www.tutorialspoint.com/jasper_reports/jasper_report_data_sources.htm) available besides Databases. What I chose is to send variables to the Jasper Reports as ***Parameters***.

Let's go Step by Step through the process:

#### Add Jasper Report Plugin To Eclipse

If you are not using [Eclipse JEE](https://www.java67.com/2018/02/5-free-eclipse-and-junit-online-courses-java-developers.html), this plugin might give issues. So be mindful of that as well.

```
Window → Eclipse Market Place → Search Jasper → Click Install
```

Complete the Installation with the installation wizard. Check whether it is installed:

```
File → New → Jasper Report
```

If you can find the Jasper Report option under “New”, that means the installation is successful.

#### Scan and Resize Pre-printed Form of yours

Now scan your image using a professional scanner (No phone scanning!). Let's assume our form is in A4 size. Then you have to convert your image into `595 px x 842 px`, using an online resizing tool.

#### Creating the Jasper Report

`File → New → Jasper Report` will open up the Jasper Report Creating Window. In the First window, select “Blank A4” option and click “next”. In the next window, specify the location you want to generate your .jrxml file (simply saying, the file location of the report template). Now without clicking “next”, click “Finish”.

#### Arranging the Layout of the Report

You will see there are different bands in the initially generated Report Design. Since we are arranging fields onto a pre-printed form, we do not need any band except “Detail-1” band. Therefore, Delete all those bands, using the “Outline” pane.

Now right click on the report and give “Remove page margins”. Again right click and go to “Page format”. You will see that the selected page format is custom, even though we specified as “Blank\_A4”. That is because we played around with the margin. You should select A4 instead of custom, in that drop-down list. After that check whether the column width is set to 595 px.

Goto the “Outline” pane again and right click on “Detail-1” band. Select the option “Maximize band height” from the list of options.

Voila! Now we have an A4 that we can freely manipulate.

Next, go to `View → Background → Import Background`. From the “Choose” window you got, select the previously scanned and resized image as the background.

Now go to “Outline” pane once again, and right-click on “Parameter". Now click “Create New Parameter”. Give Parameter the **exact** **same** variable name and type you used in readExcel() method. So according to my method, I created 3 parameters named; registration\_number, student\_name, and course\_fee.

Next, drag and drop the parameter to the design area. Since you have the scanned image as your background, you can place those parameters in the place you want. You can resize and move the parameter to fit into the pre-printed boxes. You can also use properties window to set x and y coordinates for placing the parameters and size values to resize it properly to fit pre-printed spaces. Apart from that, font related formatting also comes very handy in this task. You can use different fonts and different sizes to make it look natural on the pre-printed form.

Now click the preview button, to check whether everything gets rendered properly. If that is a success, we can move into sending parameters to the form using the code.

Before that, one more thing, compile the `.jrxml` file to `.jasper` file using the Design window’s compile icon.

![](https://cdn-images-1.medium.com/max/800/1*ywzRxh8f82Yu4F2YVg_Xhw.png)

Use compiler option to convert .jrxml to .jasper file

#### Sending parameters to the Jasper Report

First I created a List of Maps to hold each student object

```
List<Map<String, Object>> students = new ArrayList<Map<String, Object>>();
```

Next, I created a parameter map for each student details row in the Excel sheet when I am iterating through each row using Apache POI (as discussed above)

```
while (rowIterator.hasNext()){
... ... ...
//Some codes
... ... ...
```

```
String registration_number = validate(row.getCell(CellReference.convertColStringToIndex("A")));
```

```
String student_name = validate(row.getCell(CellReference.convertColStringToIndex("B")));
```

```
String course_fee = validate(row.getCell(CellReference.convertColStringToIndex("C")));
```

```
Map<String, Object> student = new HashMap<String, Object>();
```

```
student.put("registration_number", registration_number);
student.put("student_name", student_name);
student.put("course_fee", course_fee);
```

```
students.add(student);
```

```
}
```

After that, I am passing that students list to a method in another class to generate the PDF reports.

```
CreateReport createReport = new CreateReport();
createReport.createPDFs(students);
```

#### Making one PDF from each one record of students

So now we have to make the createPDFs method of ours, inside the CreateReport class.

> Note: I won’t show any error handling codes or proper method signatures

![](https://cdn-images-1.medium.com/max/800/1*FHtYWW8WeLgQdo2edLyuzA.png)

Creating one PDF file each for every student record

With the above mechanism, it will [create one PDF](http://javarevisited.blogspot.sg/2014/05/open-source-java-PDF-File-libraries-Apache-FOP-vs-iText.html) each for each student record with one A4 page in them.

When thinking practically, you will understand what a hassle it is to print those PDFs if there are 1000 students. In such cases, we may need a one huge PDF with 1000 pages, instead of 1000 separate PDFs.

#### Making one PDF instead of many

The concept we use here is `jasperPrintLists`. It is just a simple list to hold all jasperPrint objects. For that, add the following line at the beginning of the method:

```
List<JasperPrint> jasperPrintList = new ArrayList<JasperPrint>();
```

Now we need to modify our code a bit, to make it export all reports as one PDF:

![](https://cdn-images-1.medium.com/max/800/1*0zoxxQxw-Slk6W-SwLGMYQ.png)

Creating one PDF file with a one-page report each for each student records

As you can see, the code is pretty much the same. The key is to make a JasperReport list and exporting the list as one huge PDF file.

Voila! You got what you needed! Congratulations. 💪

Today’s post comes to an end with it. To be honest, I first wrote it as a note to myself. But later thought someone may find it important. It has been a “How-to” type of a tutorial this time. Hope you enjoyed. As always, leave a comment below if you come across an issue. I am more than willing to help. See you soon with another post! Until then,

Happy coding! ❤

Other Java Articles You may like:

1. [5 Free Spring Framework Courses for Java Developers](http://www.java67.com/2017/11/top-5-free-core-spring-mvc-courses-learn-online.html)
2. [Top 5 Courses to learn Web Development in 2018](https://javarevisited.blogspot.com/2018/02/top-5-online-courses-to-learn-web-development.html)
3. [5 Courses to Learn Big Data and Apache Spark](http://javarevisited.blogspot.com/2017/12/top-5-courses-to-learn-big-data-and.html)
4. [Top 10 JavaScript Tutorials and Courses for Web Developers](https://javarevisited.blogspot.com/2018/06/top-10-courses-to-learn-javascript-in.html)
5. [Top 5 Courses to Learn Spring Boot in 2018](https://javarevisited.blogspot.com/2018/05/top-5-courses-to-learn-spring-boot-in.html)
6. [5 Free Data Structure and Algorithms Courses](https://javarevisited.blogspot.com/2018/01/top-5-free-data-structure-and-algorithm-courses-java--c-programmers.html)
7. [5 Free Linux Courses for Programmers and Developers](http://www.java67.com/2018/02/5-free-linux-unix-courses-for-programmers-learn-online.html)
8. [5 Free Courses to Learn React JS Framework](http://www.java67.com/2018/02/5-free-react-courses-for-web-developers.html)
9. [10 Free Courses to Learn Data Structure in Java for beginners](http://www.java67.com/2019/02/top-10-free-algorithms-and-data.html)
