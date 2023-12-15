# Extensions Ideas
## Documents
- Web page to upload documents and start indexing.
- Replace the local scripts `prepdocs` by a Function App to calculate the embeddings on Azure.
# The Developer Corner
## Customize
### Frontend
See https://github.com/philhu22/azure-search-openai-demo/blob/experiment-0/docs/customization.md#customizing-the-ui

### Backend
https://github.com/philhu22/azure-search-openai-demo/blob/experiment-0/docs/customization.md#customizing-the-backend

## Prepare documents
### Debug python script launched from shell script

- See https://github.com/bulletmark/debugpy-run
- Add a remonte debug configuration in `launch.json`
    ```json
    {
        "name": "Remote Attach",
        "type": "python",
        "request": "attach",
        "connect": {
            "host": "localhost",
            "port": 5678
        }
    }
    ```
- In the shell script, modify the launch command to use `debugpy-run`:
  ```sh
  #./scripts/.venv/bin/python ./scripts/prepdocs.py \
    debugpy-run ./scripts/prepdocs.py -- \
  --files "$LOCAL_FILES" \
  ...
  ```
- In the terminal, select the python venv:
    ```sh
    cd ~/source/azure-ai/azure-search-openai-demo
    source ./scripts/.venv/bin/activate
    ```

- Run the shell script:
    ```sh
    ./scripts/prepdocs.sh
    ```
- In VS Code, start debugging, e.g. set a breakpoint then start the Remote Attach debug session.


## Run locally
see https://github.com/microsoft/WSL/issues/5211#issuecomment-1783883702 (not working)
see https://stackoverflow.com/questions/67814265/what-is-the-best-way-to-open-html-files-from-vscode-when-using-wsl (not working)

```sh
cd app
./start.sh
```

## Bots
### EchoBot1 tutorial

#### Azure Deployment
See [Provision and publish a bot](https://learn.microsoft.com/en-us/azure/bot-service/provision-and-publish-a-bot?view=azure-bot-service-4.0&tabs=singletenant%2Ccsharp)

```cmd
az account set --subscription "Microsoft Partner Network"
az ad app create --display-name "txAISearchEchoBot1" --sign-in-audience "AzureADMyOrg"
az ad app credential reset --id "0ead040d-6b6c-45fd-bcee-f263b8989d48"
```
```json
{
  "appId": "0ead040d-6b6c-45fd-bcee-f263b8989d48",
  "password": "Im~8Q~lN3qYoKbzwSxw~~GI1eDIqqw1Dht15HaTC",
  "tenant": "ea0ac4f9-498b-4214-a5cc-41fbbcbe78fc"
}
```

```cmd
cd C:\Users\PhilippeHuet\source\azure-search\azure-search-openai-bots\EchoBot1\DeploymentTemplates\DeployUseExistResourceGroup
az deployment group create --resource-group "TXPART-RAG-DEMO-PY-BOTS" --template-file template-BotApp-with-rg.json --parameters parameters-for-template-BotApp-with-rg.json
az deployment group create --resource-group "TXPART-RAG-DEMO-PY-BOTS" --template-file template-AzureBot-with-rg.json --parameters parameters-for-template-AzureBot-with-rg.json
```

```cmd
cd ../..
dotnet clean
dotnet build -c Release
az bot prepare-deploy --lang Csharp --code-dir "." --proj-file-path "EchoBot1.csproj"

cd ..
az webapp deployment source config-zip --resource-group "TXPART-RAG-DEMO-PY-BOTS" --name "tx-aisearch-EchoBot1" --src "EchoBot1.zip"
```

### Add authentication to a bot
See
- [Add authentication to a bot](https://learn.microsoft.com/en-us/azure/bot-service/bot-builder-authentication?view=azure-bot-service-4.0&source=recommendations&tabs=userassigned%2Caadv2%2Ccsharp) for the full procedure.
- [OAuth URL support in Azure AI Bot Service](https://learn.microsoft.com/en-us/azure/bot-service/ref-oauth-redirect-urls?view=azure-bot-service-4.0) to find the supported redirect URLs
- [Add authentication to your Teams bot](https://learn.microsoft.com/en-us/microsoftteams/platform/bots/how-to/authentication/add-authentication?tabs=dotnet%2Cdotnet-sample#create-azure-bot-resource-registration) to clarify things that are not clear in the bot procedure above. Particularly, how to define the `OAuth Connection Settings`.
- [Configure the Emulator for authentication](https://learn.microsoft.com/en-us/azure/bot-service/bot-service-debug-emulator?view=azure-bot-service-4.0&tabs=csharp#configure-the-emulator-for-authentication)

Mmh, following the steps described in the documents above does not work. I get 401 because no autorization token is created. Let's try another approach using the following procedures that target Teams:
- [samples/bot-conversation-sso-quickstart/BotSSOSetup.md](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation-sso-quickstart/BotSSOSetup.md)
- [samples/bot-teams-authentication/csharp](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-teams-authentication/csharp)


Lets'start with the SSO app registration in AAD:
- Name: `TxAiSearchBotAad`
- AppId: `2055ee5f-b1bd-4a1b-9fd1-1b03cabf326d`
- AppSecret `bot login` : `rrb8Q~4E9vi1tDqxCZfAHLxZtingdB7zcxrZjb6A`
- Application ID URI: `api://botid-2055ee5f-b1bd-4a1b-9fd1-1b03cabf326d`

## Misc
### Tips
#### How to fix Git Clone "Filename too long" Error in Windows?
```cmd
# https://katalon-inc.my.site.com/katalonhelpcenter/s/article/How-to-fix-Git-Clone-Filename-too-long-Error-in-Windows
# in Admin console
git config --system core.longpaths true
```