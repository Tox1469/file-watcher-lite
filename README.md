[![CI](https://img.shields.io/github/actions/workflow/status/Tox1469/file-watcher-lite/ci.yml?style=flat-square&label=ci)](https://github.com/Tox1469/file-watcher-lite/actions)
[![License](https://img.shields.io/github/license/Tox1469/file-watcher-lite?style=flat-square)](LICENSE)
[![Release](https://img.shields.io/github/v/release/Tox1469/file-watcher-lite?style=flat-square)](https://github.com/Tox1469/file-watcher-lite/releases)
[![Stars](https://img.shields.io/github/stars/Tox1469/file-watcher-lite?style=flat-square)](https://github.com/Tox1469/file-watcher-lite/stargazers)

---

# file-watcher-lite

Observa arquivos e diretorios com debounce configuravel.

## Instalação

```bash
npm install file-watcher-lite
```

## Uso

```ts
import { Watcher } from 'file-watcher-lite';

const w = new Watcher((ev, file) => console.log(ev, file), { debounce: 200 });
w.add('./src');
```

## API

- `new Watcher(handler, { debounce?, recursive? })`
- `.add(path)` / `.close()`

## Licença

MIT