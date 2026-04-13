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
