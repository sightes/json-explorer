.PHONY: install run build dev clean test lint typecheck help

PROJECT_DIR := json-explorer

help: ## Mostrar esta ayuda
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Instalar dependencias
	cd $(PROJECT_DIR) && npm install

build: ## Construir proyecto para producción
	cd $(PROJECT_DIR) && npm run build

dev: ## Iniciar servidor de desarrollo
	cd $(PROJECT_DIR) && npm run dev

clean: ## Limpiar build y dependencias
	cd $(PROJECT_DIR) && rm -rf .next node_modules/.cache

test: ## Ejecutar tests
	cd $(PROJECT_DIR) && npm run test

lint: ## Ejecutar linter
	cd $(PROJECT_DIR) && npm run lint

typecheck: ## Verificar tipos TypeScript
	cd $(PROJECT_DIR) && npm run typecheck

preview: ## Previsualizar build de producción
	cd $(PROJECT_DIR) && npm run start

deps: ## Actualizar dependencias
	cd $(PROJECT_DIR) && npm update && npm audit fix

format: ## Formatear código
	cd $(PROJECT_DIR) && npx prettier --write "src/**/*.{ts,tsx}" && npx prettier --write "src/**/*.css"