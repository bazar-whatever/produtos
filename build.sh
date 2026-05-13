#!/bin/bash
# Regera data/products.js a partir de data/products.json
python3 -c "
import json, sys
try:
    with open('data/products.json', encoding='utf-8') as f:
        data = json.load(f)
    with open('data/products.js', 'w', encoding='utf-8') as f:
        f.write('window.CATALOG = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\n')
    total = len(data.get('products', []))
    print(f'✓ products.js gerado — {total} produtos')
except json.JSONDecodeError as e:
    print(f'✗ Erro no JSON: {e}')
    sys.exit(1)
"
