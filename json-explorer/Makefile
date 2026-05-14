.PHONY: install run build dev clean test lint typecheck help

help: ## Mostrar esta ayuda
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Instalar dependencias
	npm install

build: ## Construir proyecto para producción
	npm run build

dev: ## Iniciar servidor de desarrollo
	npm run dev

clean: ## Limpiar build y dependencias
	rm -rf .next node_modules/.cache

test: ## Ejecutar tests unitarios (Vitest)
	npm run test

test:integration: ## Ejecutar tests de integración (Playwright)
	npx playwright test

test:all: test test:integration ## Ejecutar todos los tests

lint: ## Ejecutar linter
	npm run lint

typecheck: ## Verificar tipos TypeScript
	npm run typecheck

preview: ## Previsualizar build de producción
	npm run start

deps: ## Actualizar dependencias
	npm update && npm audit fix

format: ## Formatear código
	npx prettier --write "src/**/*.{ts,tsx}" "src/**/*.css"

prod: build preview ## Ejecutar build y previsualizar