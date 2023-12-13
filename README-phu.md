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
