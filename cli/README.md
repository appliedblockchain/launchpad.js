# base-app-cli

CLI tool to clone base-app into your current working directory with the specified project name.

# Usage

`npm install base-app-cli`

`base-app-cli <command> <flags>`

### `Valid commands:`

create

### `Valid flags:`

--protocol <ssh | https>

--bootstrap

-h, --help

-V, --version

--no-color

--quiet

-v, --verbose

# Examples

```sh
base-app-cli create # Creates a bare-bones 
base-app-cli create --bootstrap # Clones the entire base-app project
base-app-cli create --protocol https # Clones the repo using the https protocol
```