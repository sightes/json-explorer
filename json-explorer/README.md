# JSON Explorer

Herramienta web para visualizar y explorar datos JSON de forma interactiva.

## Descripción

JSON Explorer es una aplicación desarrollada con Next.js que permite:
- Pegar código JSON y visualizarlo como un árbol navegable
- Buscar claves y valores dentro del documento
- Copiar valores individuales al portapapeles
- Cargar ejemplos predefinidos para probar la aplicación

## Requisitos

- Node.js 18+
- npm 9+

## Instalación

```bash
cd json-explorer
make install
```

## Uso rápido

1. **Iniciar el servidor de desarrollo:**
   ```bash
   make dev
   ```

2. **Abrir en el navegador:**
   ```
   http://localhost:3000
   ```

3. **Explorar JSON:**
   - Pegar JSON en el panel izquierdo
   - Hacer clic en los nodos para expandir/colapsar
   - Usar la barra de búsqueda para filtrar
   - Hacer clic en el icono de copiar para copiar valores

## Características

### Input de JSON
- Área de texto con números de línea
- Validación automática e indicadores de error
- Soporte para JSON formateado o minificado

### Vista de árbol interactiva
- Nodos expandibles con iconos de chevron
- Badges de conteo para objetos y arrays
- Diferenciación visual por tipo de dato:
  - **Verde** — claves
  - **Azul** — strings
  - **Naranja** — numbers
  - **Violeta** — booleans
  - **Rojo** — null

### Búsqueda
- Barra de búsqueda con filtro en tiempo real
- Resalta coincidencias en claves y valores
- Contador de resultados

### Copiar valores
- Botón de copiar en cada valor
- Feedback visual al copiar
- Toast de confirmación

### Samples
- Menú desplegable con 3 ejemplos:
  - API Response
  - Config File
  - Nested Data

## Comandos

| Comando | Descripción |
|---------|-------------|
| `make install` | Instalar dependencias |
| `make dev` | Iniciar servidor de desarrollo |
| `make build` | Construir para producción |
| `make preview` | Previsualizar build |
| `make clean` | Limpiar cache |
| `make test` | Ejecutar tests |
| `make lint` | Verificar código |
| `make typecheck` | Verificar tipos |

## Tecnologías

| Categoría | Tecnología |
|-----------|------------|
| Framework | Next.js 16 |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS |
| Íconos | Lucide React |
| Testing | Vitest + Testing Library |

## Estructura del proyecto

```
json-explorer/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # Componentes React
│   │   ├── page/         # Componentes de página
│   │   ├── JSONInput.tsx # Panel de entrada
│   │   ├── JSONTree.tsx  # Componente árbol
│   │   └── Toast.tsx     # Notificaciones
│   ├── data/             # Datos estáticos
│   │   └── samples.ts    # Ejemplos JSON
│   ├── types/            # Tipos TypeScript
│   │   └── json.ts       # Interfaces JSONNode
│   └── test/             # Tests
├── public/               # Archivos estáticos
├── SPEC.md               # Especificación de diseño
├── Makefile              # Comandos de automatización
└── README.md              # Este archivo
```

## API del árbol JSON

El componente principal `JSONTree` espera:

```typescript
interface JSONNode {
  key: string;
  value: unknown;
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
  path: string;
  children?: JSONNode[];
}
```

**Props:**
- `data: JSONNode` — Raíz del árbol
- `searchTerm?: string` — Término de búsqueda
- `onCopy: (value: string) => void` — Callback al copiar

## Licencia

Privado — Proyecto de demostración.