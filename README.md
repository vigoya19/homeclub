# Apartment API

API REST para la gestión de apartamentos que permite crear, actualizar y buscar apartamentos con funcionalidades de geolocalización y filtrado avanzado.

## Características

- ✅ Crear apartamentos con información detallada
- ✅ Actualizar información de apartamentos existentes
- ✅ Búsqueda avanzada con filtros geográficos y de precio
- ✅ Soporte para geolocalización (latitud y longitud)
- ✅ Filtrado por tipo de apartamento
- ✅ Paginación de resultados
- ✅ Estados de apartamento (activo/inactivo)

## Endpoints

### 1. Crear Apartamento

Crea un nuevo apartamento en el sistema.

**Endpoint:** `POST /apartments`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Apartamento Playa3",
  "direction": "Calle 123 #45-68",
  "type": "corporativo",
  "city": "Cartagena",
  "country": "Colombia",
  "latitude": 10.391048,
  "longitude": -75.479427,
  "state": "active"
}
```

**Ejemplo cURL:**
```bash
curl --location --request GET 'http://localhost:3000/apartments/search?latitude=40.410674&longitude=-3.654633&type=corporativo&type=turistico&minPrice=50&maxPrice=4500&page=1&pageSize=10' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'latitude=40.410674' \
--data-urlencode 'longitude=-3.654633' \
--data-urlencode 'type=corporativo' \
--data-urlencode 'type=turistico' \
--data-urlencode 'minPrice=50' \
--data-urlencode 'maxPrice=4500' \
--data-urlencode 'page=1' \
--data-urlencode 'pageSize=10'
```

### 2. Actualizar Apartamento

Actualiza la información de un apartamento existente.

**Endpoint:** `PUT /apartments/:id`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Torrenazas renovado",
  "city": "ALICANTE Centro",
  "state": "inactive"
}
```

**Ejemplo cURL:**
```bash
curl --location --request PUT 'http://localhost:3000/apartments/2' \
--header 'Content-Type: application/json' \
--data '{
  "name": "Torrenazas renovado",
  "city": "ALICANTE Centro",
  "state": "inactive"
}'
```

### 3. Buscar Apartamentos

Busca apartamentos con filtros avanzados incluyendo geolocalización, tipo, precio y paginación.

**Endpoint:** `GET /apartments/search`

**Parámetros de consulta:**
- `latitude` (float): Latitud para búsqueda geográfica
- `longitude` (float): Longitud para búsqueda geográfica
- `type` (string): Tipo de apartamento (puede ser múltiple)
- `minPrice` (number): Precio mínimo
- `maxPrice` (number): Precio máximo
- `page` (number): Número de página para paginación
- `pageSize` (number): Cantidad de resultados por página

**Ejemplo cURL:**
```bash
curl --location --request GET 'http://localhost:3000/apartments/search?latitude=40.410674&longitude=-3.654633&type=corporativo&type=turistico&minPrice=50&maxPrice=4500&page=1&pageSize=10' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'latitude=40.410674' \
--data-urlencode 'longitude=-3.654633' \
--data-urlencode 'type=corporativo' \
--data-urlencode 'type=turistico' \
--data-urlencode 'minPrice=50' \
--data-urlencode 'maxPrice=4500' \
--data-urlencode 'page=1' \
--data-urlencode 'pageSize=10'
```

## Modelo de Datos

### Apartamento

```json
{
  "id": "number",
  "name": "string",
  "direction": "string",
  "type": "string",
  "city": "string",
  "country": "string",
  "latitude": "number",
  "longitude": "number",
  "state": "string"
}
```

### Campos

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| `name` | string | Nombre del apartamento | ✅ |
| `direction` | string | Dirección completa | ✅ |
| `type` | string | Tipo de apartamento (corporativo, turístico, etc.) | ✅ |
| `city` | string | Ciudad donde se ubica | ✅ |
| `country` | string | País donde se ubica | ✅ |
| `latitude` | number | Coordenada de latitud | ✅ |
| `longitude` | number | Coordenada de longitud | ✅ |
| `state` | string | Estado del apartamento (active/inactive) | ✅ |

## Tipos de Apartamento

- `corporativo`: Apartamentos para uso empresarial
- `turistico`: Apartamentos para turismo
- Otros tipos según necesidades del negocio

## Estados

- `active`: Apartamento disponible
- `inactive`: Apartamento no disponible

## Instalación y Uso

### Prerrequisitos

- Node.js (versión recomendada)
- Base de datos configurada
- Puerto 3000 disponible

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/vigoya19/homeclub.git

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar el servidor
npm run start:dev                                             
```

### Variables de Entorno

```env
PORT=3000
DATABASE_URL=your_database_url
NODE_ENV=development
```


### Búsqueda Exitosa
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Apartamento Playa3",
      "direction": "Calle 123 #45-68",
      "type": "corporativo",
      "city": "Cartagena",
      "country": "Colombia",
      "latitude": 10.391048,
      "longitude": -75.479427,
      "state": "active"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 1,
    "totalPages": 1
  }
}



# Tariff API

API REST para la gestión de tarifas de apartamentos que permite crear tarifas con períodos de tiempo y unidades de facturación específicas.

## Características

- ✅ Crear tarifas para apartamentos específicos
- ✅ Gestión de períodos de tiempo (fecha inicio y fin)
- ✅ Soporte para diferentes unidades de facturación
- ✅ Asociación directa con apartamentos por ID

## Endpoints

### 1. Crear Tarifa

Crea una nueva tarifa para un apartamento específico.

**Endpoint:** `POST /tariffs`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "apartmentId": 5,
  "dateStart": "2026-01-01",
  "dateEnd": "2026-02-31",
  "amount": 4000,
  "unit": "mensual"
}
```

**Ejemplo cURL:**
```bash
curl --location 'http://localhost:3000/tariffs' \
--header 'Content-Type: application/json' \
--data '{
  "apartmentId": 5,
  "dateStart": "2026-01-01",
  "dateEnd": "2026-02-31",
  "amount": 4000,
  "unit": "mensual"
}'
```

## Modelo de Datos

### Tarifa

```json
{
  "apartmentId": "number",
  "dateStart": "string",
  "dateEnd": "string",
  "amount": "number",
  "unit": "string"
}
```

### Campos

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| `apartmentId` | number | ID del apartamento asociado | ✅ |
| `dateStart` | string | Fecha de inicio de la tarifa (YYYY-MM-DD) | ✅ |
| `dateEnd` | string | Fecha de fin de la tarifa (YYYY-MM-DD) | ✅ |
| `amount` | number | Monto de la tarifa | ✅ |
| `unit` | string | Unidad de facturación | ✅ |

## Unidades de Facturación

- `mensual`: Tarifa por mes
- `diario`: Tarifa por día
- `semanal`: Tarifa por semana
- `anual`: Tarifa por año

## Instalación y Uso

### Prerrequisitos

- Node.js (versión recomendada)
- Base de datos configurada
- Puerto 3000 disponible

### Instalación

```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar el servidor
npm start
```

### Variables de Entorno

```env
PORT=3000
DATABASE_URL=your_database_url
NODE_ENV=development
```

## Ejemplos de Respuesta

### Creación Exitosa
```json
{
  "success": true,
  "data": {
    "id": 1,
    "apartmentId": 5,
    "dateStart": "2026-01-01",
    "dateEnd": "2026-02-31",
    "amount": 4000,
    "unit": "mensual"
  },
  "message": "Tarifa creada exitosamente"
}
```



# Apartment Metadata API

API REST para la gestión de metadatos de apartamentos que permite crear y actualizar información adicional como descripciones e imágenes de los apartamentos.

## Características

- ✅ Crear metadatos para apartamentos con código único
- ✅ Actualizar información de metadatos existentes
- ✅ Gestión de descripciones detalladas
- ✅ Soporte para URLs de imágenes
- ✅ Identificación por código único

## Endpoints

### 1. Crear Metadatos de Apartamento

Crea nuevos metadatos para un apartamento específico.

**Endpoint:** `POST /apartment-metadata`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "code": 10,
  "description": "Hermoso apartamento con vista al mar 2",
  "imageUrl": "https://ejemplo.com/imagen1.jpg"
}
```

**Ejemplo cURL:**
```bash
curl --location 'http://localhost:3000/apartment-metadata' \
--header 'Content-Type: application/json' \
--data '{
  "code": 10,
  "description": "Hermoso apartamento con vista al mar 2",
  "imageUrl": "https://ejemplo.com/imagen1.jpg"
}'
```

### 2. Actualizar Metadatos de Apartamento

Actualiza la información de metadatos existentes.

**Endpoint:** `PUT /apartment-metadata/:id`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "description": "Apartamento remodelado, vista increíble 2",
  "imageUrl": "https://ejemplo.com/nueva-imagen.jpg"
}
```

**Ejemplo cURL:**
```bash
curl --location --request PUT 'http://localhost:3000/apartment-metadata/1' \
--header 'Content-Type: application/json' \
--data '{
  "description": "Apartamento remodelado, vista increíble 2",
  "imageUrl": "https://ejemplo.com/nueva-imagen.jpg"
}'
```

## Modelo de Datos

### Metadatos de Apartamento

```json
{
  "id": "number",
  "code": "number",
  "description": "string",
  "imageUrl": "string"
}
```

### Campos

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| `code` | number | Código único del apartamento | ✅ |
| `description` | string | Descripción detallada del apartamento | ✅ |
| `imageUrl` | string | URL de la imagen principal del apartamento | ✅ |

## Validaciones

### Código
- El `code` debe ser un número único
- No se permiten códigos duplicados

### Descripción
- La `description` debe ser una cadena de texto
- Se recomienda una descripción detallada y atractiva

### URL de Imagen
- La `imageUrl` debe ser una URL válida
- Se recomienda us