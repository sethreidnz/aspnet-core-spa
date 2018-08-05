# ASP.NET Single Page Apps

This repository is an example of how to serve a SPA application with ASP.NET Core using a web.config to route the client 
routes to the output of a [Create React App](https://github.com/facebook/create-react-app). This has been created to work with
Azure but would work in any IIS website.

The implementation is made up of the following approach:

- Two separate projects `client` (Create React App) and `server` (ASP.NET Core MVC)
- Use the regular Create React App `npm start` build during development and point API requests to the server at `http://localhost:5000`
- Enable CORS on the server during development to allow for the front end application
- Use web.config reroute rules to ensure that the static files are served by IIS but API requests are let through to the MVC backend

## Prerequisites

In order to run the the app you need the following on your machine:

- [Node](https://nodejs.org/en/) >= 8
- [.NET Core SDK](https://www.microsoft.com/net/download) - Either the SDK directly or via Visual Studio 2017

In order to deploy to Azure you will need:

- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)
- [Visual Studio](https://visualstudio.microsoft.com/) - For Mac or Windows

## Getting Started

To start development you need to restore the .NET dependencies and the npm dependencies, and set the ASPNETCORE_ENVIRONMENT environement variable to `Development`.

### Server

Follow these instruction to get get the server up and running.

#### Restoring Packages

Run the following from the root of the repository to restore your .NET dependencies:

```bash
cd src/server
dotnet restore
```

#### Run the backend

**From Visual Studio Code**

Install [Visual Studio Code](https://code.visualstudio.com), open the root folder and press F5.

**From Visual Studio**

Install [Visual Studio](https://visualstudio.com) open the project file `src/server/server.csproj` and press F5.

**From the command line**

Run the following from the root of the repository to set the environment variable to be in development mode:

```bash
set ASPNETCORE_ENVIRONMENT=Development # on windows
export ASPNETCORE_ENVIRONMENT=Development # on mac
```

Then run the following in a terminal:

``` bash
cd src/server
dotnet restore
dotnet run
```

### Front end client

To run the front end client follow these instructions

#### Restoring NPM packages

Run the following from the root of the repository to install the NPM packages:

```bash
cd src/client
npm install
```

#### Restoring NPM packages

Run the following from the root of the repository to run the client app:

```bash
cd src/client
npm start
```

## Creating a deployment package

You need to first build the client and then publish the server. Use the following instructions to do so.

### Build the client

Run the following from the root of the repository to build the client app (and copy the files in to the server wwwroot folder):

```bash
cd src/client
npm run build
```

## Deploying to azure

The first thing you need to do is deploy create the resource group and the resources in it.

### Deploying you resrources

This repository contains an [Azure Resource Manager Templates (ARM)](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-authoring-templates) which will let you deploy
to an Azure web app. First you need to build the client app which will automatically copy the files into 
the folder `src/server/wwwroot`.

Run the following to log into you Azure account on the CLI. 

```bash
az login # follow the prompts to login with your Azure account
```

Run the following replacing `deploymentLocation` with an azure location and `resourceGroupName` with a name for your resource group.

```bash
az group create -l deploymentLocation -n resourceGroupName
```

> **Note:** You can get the list of available location names from the command `az account list-locations` and take the `name` property.

Run the following to deploy the required resources to your new resource group, replacing `resourceGroupName` with the resource group you created
above:

```bash
az group deployment create --template-file azuredeploy.json --resource-group resourceGroupName
```

### Creating a deployment package

You need to first build the client before you deploy the . Use the following instructions to do so.

### Build the client

1. Run the following from the root of the repository to build the client app (and copy the files in to the server wwwroot folder):

  ```bash
  cd src/client
  npm run build
  ```

1. Copy the content of the folder `src/client/build` in to the folder `src/server/wwwroot`

> **Note**: In a production application you would automate this step in your build and not manually copy the files over.

### Deploying the published package

The easiest way to deploy the web app to azure is to use Visual Studio 2017 (for Mac or Windows). For a production app you should use a CI/CD pipeline to do this but for the sake of keeping the example simple I have included instructions using Visual Studio.

1. Open the file `src/server/server.csproj` in Visual Studio.
1. In the solution explorer, right click on the project `server`
1. Select Publish => Publish to Azure
1. If needed sign into the Azure account you used to deploy the resources above
1. In the list of Azure App Services click on the app service `resourceGroupName-web-app` where resourceGroupName is the resource group you created earlier
1. Click publish

This should launch the new site in your default browser. If you are not seeing the client app being served up then make sure that you followed the section to build the client first.