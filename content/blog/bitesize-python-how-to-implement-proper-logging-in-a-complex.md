---
title: "[Bitesize Python] How to implement proper logging in a complex multi-module project"
slug: "bitesize-python-how-to-implement-proper-logging-in-a-complex"
date: "2024-02-22"
excerpt: "The Python.org docs mention three ways of configuring logging with complex handlers and formatters."
tags: []
source: "medium"
mediumUrl: "https://medium.com/@savindi-wijenayaka/bitesize-python-multi-module-logging-310943269a73"
featured: true
readingTime: 6
convertedAt: "2026-04-27T02:49:59Z"
coverImage: "/assets/blog/bitesize-python-how-to-implement-proper-logging-in-a-complex.jpg"
---

The Python.org docs mention three ways of configuring logging with complex handlers and formatters.

1. Creating loggers, handlers, and formatters explicitly using Python code that calls the configuration methods listed above.
2. Creating a logging config file and reading it using the `fileConfig()` function.
3. Creating a dictionary of configuration information and passing it to the `dictConfig()` function.

> This post will use the 2nd option `fileConfig()`, as it is cleaner and gives the feeling it is configurable according to the needs of the application package.

> I will make the logfile name a dynamic one, as it is mostly the case if you want the logfile name to reflect the experiment you carry out.

### Example project:

#### 1. Project structure:

```markdown
application
    |_ module1
        |_ __init__.py
        |_ file11.py
    |_ module2
        |_ __init__.py
        |_submodule1
            |_ __init__.py
            |_classfile211.py
        |_file21.py
    |_ mainfile.py
    |_ __init__.py
project.config          # configs for the project
logging.config
.gitignore
LICENSE
README.md
run.sh                  # use if you want to run multiple terminal commands
setup.py                # to package the python project
```

#### 2. logging.config file:

```plaintext
[loggers]
keys=root,application

[handlers]
keys=consoleHandler,fileHandler

[formatters]
keys=fileFormatter,consoleFormatter

[logger_root]
level=DEBUG
handlers=consoleHandler

[logger_application]
level=INFO
handlers=consoleHandler,fileHandler
qualname=application
propagate=0

[handler_consoleHandler]
class=StreamHandler
level=INFO
formatter=consoleFormatter
args=(sys.stdout,)

[handler_fileHandler]
class=FileHandler
level=INFO
formatter=fileFormatter
args=('%(logfilepath)s','w')

[formatter_fileFormatter]
format=%(asctime)s - %(name)s - %(levelname)s - %(message)s
datefmt=%Y-%m-%d %I:%M:%S %p

[formatter_consoleFormatter]
format=%(asctime)s - %(name)s - %(levelname)s - %(message)s
datefmt=%Y-%m-%d %I:%M:%S %p
```

> You can format different handlers separately and change the logging level according to your needs.

#### 3. setup.py:

```python
from setuptools import setup, find_packages

setup(
    name="your-application-name",
    version="0.1.0",
    url="https://blah",
    author="Savindi Wijenayaka",
    author_email="author@gmail.com",
    description="blah blah blah",
    packages=find_packages(),
    py_modules=["application"],
    install_requires=[
        "matplotlib==3.8.0",  # example of required packages
    ],
    entry_points="""
            [console_scripts]
            application=application.mainfile:main
    """,     # when you type "application" in the terminal,
             # this would point to the main method in mainfile.py
)
```

#### 4. mainfile.py:

I named this file `mainfile.py` instead of using traditional `main.py`, as this could take any name as long as it is your specified starting point.

```python
import logging
import logging.config

def main():
    if 'EXPERIMENT_NAME' not in os.environ:
          current_datetime = datetime.now().strftime('%b%d_%H%M')
          os.environ['EXPERIMENT_NAME'] = f"run_{current_datetime}"

    log_file_path = os.path.join(
          os.getcwd(), 'tmp', f"log_{current_datetime}.log"
      )
    logging.config.fileConfig(
          'logging.config',
          defaults={'logfilepath': log_file_path.replace("\\", "/")}
      )

def some_func():
    module_logger.info("Logging from some_func")
    # do other stuff
```

Here, I check if the `EXPERIMENT_NAME` environment variable exists; otherwise, I set it to some value (because I need it later in the code for something else). However, if you don’t need it again and are fine with saving it to the current working directory, use:

```python
import os
import logging
import logging.config
from datetime import datetime

module_logger = logging.getLogger(__name__)

def main():
    current_datetime = datetime.now().strftime('%b%d_%H%M')
    logging.config.fileConfig(
          'logging.config',
          defaults={'logfilepath': os.getenv('LOG_FILE_PATH', f"run_{current_datetime}.log")}
      )

    module_logger.info("Logging from main")

# example function in mainfile
def some_func():
    module_logger.info("Logging from some_func")
    # do other stuff
```

This step will initialize the loggers you mentioned in the `logging.config` file.

In every file (module/submodule) you need to log, you can get a logger for that particular module. This makes it easy to debug as you know where your logs originated.

#### 5. Example: module1/file11.py:

```python
# other imports
import logging

module_logger = logging.getLogger(__name__)

# other variables and methods

# example function
def module_func():
    module_logger.info("Logging from module_func in file11")
```

I have added something similar to the `module2/file21.py`.

On a more granular level, you may need to log in from one of your classes. In that case, the best way to handle this would be as follows:

#### 6. Example: module2/submodule1/classfile211.py:

```python
# other imports
import logging

module_logger = logging.getLogger(__name__)

# other variables and methods

# example class
class Foo:
    x: int

    def __init__(self, x: int):
        self.x = x
        self.class_logger = logging.getLogger(__name__)
        self.a = self.bar()
        self.class_logger.info("Finished initializing a Foo class instance")

    def bar(self) -> int:
        self.class_logger.info("Foo.bar method is called when initializing an instance")
        return self.x * 2

    def barbar(self) -> int:
        self.class_logger.info("Foo.barbar method is not called during initialization")
        return self.x**2

# example function
def module_func():
    module_logger.info("Logging from module_func in classfile211")
```

> Similarly, you can use this method in a scenario where you use base class and child classes. You simply have to initialize the class logger in each class’s `__init__` method. When logged, it will show if you are in the base class or child class accordingly.

#### 7. Updating mainfile.py

Now, let's modify the main file to see how each module file behaves.

```python
import os
import logging
import logging.config
from datetime import datetime
from application.module2.submodule1 import classfile211
from application.module1 import file11
from application.module2 import file21

module_logger = logging.getLogger(__name__)

def main():
    current_datetime = datetime.now().strftime('%b%d_%H%M')
    logging.config.fileConfig(
          'logging.config',
          defaults={'logfilepath': os.getenv('LOG_FILE_PATH', f"{current_datetime}.log")}
      )

    module_logger.info("Logging from main")

    some_func()

# example function in mainfile
def some_func():
    module_logger.info("Logging from some_func in mainfile")
    # do other stuff

    # call module_func in file11
    file11.module_func()

    # create Foo object
    classfile211.Foo(x=5)

    # call module_func in classfile211
    classfile211.module_func()

    # call module_func in file21
    file21.module_func()
```

### Running the sample project:

To run the project, we will utilize the terminal for now.

1. Create a conda environment for the project named `log_test` by running `conda create -n log_test python=3.11 pip`in the terminal. You can also use `venv` for this. You can use your preferred Python version.
2. Activate the created environment: `conda activate log_test`
3. Install your package (“application”) by running `pip install -e .` in the root folder. This will use `setup.py` to install your package into the `log_test` environment. By passing the argument `-e`, you install the project in editable mode (i.e. `setuptools`’ “develop mode”) from the current directory (`.`). This will result in reflecting any edits you make to the project immediately, without you re-installing the package.
4. Optional: if you need a specific named log file, create an environment variable: `export LOG_FILE_PATH=some_log_file.log`
5. Run the package: `application`

Output:

```plaintext
2023-11-14 02:16:43 PM - application.mainfile - INFO - Logging from main
2023-11-14 02:16:43 PM - application.mainfile - INFO - Logging from some_func in mainfile
2023-11-14 02:16:43 PM - application.module1.file11 - INFO - Logging from module_func in file11
2023-11-14 02:16:43 PM - application.module2.submodule1.classfile211 - INFO - Foo.bar method is called when initializing an instance
2023-11-14 02:16:43 PM - application.module2.submodule1.classfile211 - INFO - Finished initializing a Foo class instance
2023-11-14 02:16:43 PM - application.module2.submodule1.classfile211 - INFO - Logging from module_func in classfile211
2023-11-14 02:16:43 PM - application.module2.file21 - INFO - Logging from module_func in file21
```

### Making it fancier or simpler:

You can make more complex or simpler projects using the same structure, depending on your requirements.

For example, if you want to pass console arguments to the package, use the [Click](https://click.palletsprojects.com/en/8.1.x/) or [Argparse](https://docs.python.org/3/library/argparse.html) like libraries to parse them. You can also add different command groups. You can then utilize the run.sh like bash scripts to get dynamic environment variables and call the “application” package with them.

On the other hand, you can use the same project structure without the packaging aspect to create a simple project with logging.

Thank you for reading. Hope you learned something today. If something is unclear, or if you want to add something more to this, comment below. See you in another article! 😄

### Reference:

[1] [Logging HOW-TO](https://docs.python.org/3/howto/logging.html): Python.org

[2] [Logging cookbook](https://docs.python.org/3/howto/logging-cookbook.html): Python.org

### Github Project:

[**GitHub - savindi-wijenayaka/multi-module-logging-template: Simple template project for packaged…**
*Simple template project for packaged python project with multi module logging - GitHub …*github.com](https://github.com/savindi-wijenayaka/multi-module-logging-template "https://github.com/savindi-wijenayaka/multi-module-logging-template")
