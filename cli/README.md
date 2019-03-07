# launchpad-cli

CLI tool to clone launchpad into your current working directory with the specified project name.

# Usage

`npm install launchpad-cli`

`launchpad-cli <command> <flags>`

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
launchpad-cli create # Creates a bare-bones
launchpad-cli create --bootstrap # Clones the entire launchpad project
launchpad-cli create --protocol https # Clones the repo using the https protocol
```
