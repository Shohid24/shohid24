import os
import subprocess
import sys


class Console:
    GREEN = "\033[92m"
    YELLOW = "\033[93m"
    RED = "\033[91m"
    RESET = "\033[0m"

    def error(self, message):
        print(f"{self.RED}-> {message}{self.RESET}")

    def log(self, message):
        print(f"{self.YELLOW}-> {message}{self.RESET}")

    def success(self, message):
        print(f"{self.GREEN}-> {message}{self.RESET}")

    def warn(self, message):
        print(f"{self.YELLOW}-> {message}{self.RESET}")


console = Console()


def RunScriptWithColor(scriptPath):
    scriptName = os.path.basename(scriptPath)
    console.warn(f"Running `{scriptName}`")

    try:
        result = subprocess.run(
            scriptPath, capture_output=True, text=True, shell=True, check=True
        )
        console.success(f"`{scriptName}` completed successfully!")
        if result.stdout and "pip" not in scriptName:
            console.success(f"Output:\n{result.stdout}")
    except subprocess.CalledProcessError as e:
        console.error(f"{scriptName} failed!")
        console.error(f"Error:\n{e.stderr or 'No error message'}")
    except FileNotFoundError:
        console.error(f"Error: Script '{scriptPath}' not found.")
    except Exception as e:
        console.error(f"An unexpected error occurred: {e}")


if __name__ == "__main__":
    files = [
        "python -m pip install -U pip",
        "python -m pip install -r requirements.txt",
        "python public/scripts/generateSitemap.py",
        "python public/scripts/downloadImages.py",
        "python public/scripts/compressImages.py",
    ]
    for file in files:
        RunScriptWithColor(file)

    console.success("All scripts executed successfully!")
