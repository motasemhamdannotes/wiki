import sys
from pathlib import Path

# Allow `import app...` when running pytest from the backend/ directory or the repo root.
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

FIXTURES = Path(__file__).resolve().parent / "fixtures"
