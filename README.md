# Meli-Mutant

Esta api corresponde al reto de mercado libre el cual nos propone desarrolar la siguiente problematica.

<p align="center">
  <a href="https://p.kindpng.com" target="blank"><img src="https://p.kindpng.com/picc/s/188-1888481_magneto-marvel-legends-6-action-figure-marvel-legends.png" width="500" alt="magneto" /></a>
</p>

## Problema

Examen Mercadolibre
Magneto quiere reclutar la mayor cantidad de mutantes para poder luchar contra los X-Men.
Te ha contratado a ti para que desarrolles un proyecto que detecte si un humano es mutante basándose en su secuencia de ADN.

Para eso te ha pedido crear un programa con un método o función con la siguiente firma (En alguno de los siguiente lenguajes: Java / Golang / C-C++ / Javascript (node) / Python / Ruby):

boolean isMutant(String[] dna); // Ejemplo Java

En donde recibirás como parámetro un array de Strings que representan cada fila de una tabla de (NxN) con la secuencia del ADN. Las letras de los Strings solo pueden ser: (A,T,C,G), las cuales representa cada base nitrogenada del ADN.

Sabrás si un humano es mutante, si encuentras ​más de una secuencia de cuatro letras
iguales​, de forma oblicua, horizontal o vertical.
Ejemplo (Caso mutante):
String[] dna = {"ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"};

En este caso el llamado a la función isMutant(dna) devuelve “true”.
Desarrolla el algoritmo de la manera más eficiente posible

## Solución

Teniendo en cuenta la que el problema plantea la eficiencia del algoritmo como un prioridad, fue en lo que mas me enfoque la solción desarrollada parte de las siguientes abstracciones.

## Divir el problema

### Obtener Snapshot

Lo que se hace en esta parte es dividir cualquir matriz que representa el ADN en 4 campos lo que es igual a una matrix 2 * 2
llamada como Snapshot en una matrix 3*3 tendriamos 9 Snapshot ejemplo del Snapshot 1

```javascript

const dna: String[]= {"ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"};

const snapshot = [A, T, C, A]

```

### Estrategias

Una estrategia esta formada por:

Match: posiciones a evalular dentro del snapshot

Movimientos: Operción que se le realiza a al snapshot para validar si existe un match en la siguiente matrix 2\*2

Movimiento reverso: Operación que se realiza si no se encuentra un match dentro para devolverse al anterio snapshot.

### Validación de ADN

Se valida que el ADN se n\*n y que los valores dentro de cada row se han validos.

### Tipos de estrategias.

Existen 4 tipos:

#### Horizontal

#### Vertical

#### Diagonal Derecha

#### Diagonal Izquierda

# Correr la app

## Requisitos de la maquina local

[node](https://nodejs.org/es/) en la version 12
[mongodb](https://www.mongodb.com/try/download/community) en la version v4.2.8

## Instalación de dependencias

Use el gestor de paquetes [yarn](https://yarnpkg.com/) o [npm](https://www.npmjs.com/)

```bash
yarn install

npm install
```

## Base de datos

Correr servidor de mongodb y cambiar la url en el archivo app.module.ts si es caso

```javascript
@Module({
  imports: [
    TerminusModule,
    CoreModule,
    MongooseModule.forRoot('mongodb://localhost:27017/dna'),
    MutantModule
  ],
  controllers: [HealthController]
})
export class AppModule {}
```

## Run app local development

```bash

npm run start

o

yarn run start

```

[http://localhost:9000/health](http://localhost:9000/health)

## Scripts

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API

[post mutant][(https://meli-mutante.wilarizav.vercel.app/mutant](https://meli-mutante.wilarizav.vercel.app/mutant)

[get stats][https://meli-mutante.wilarizav.vercel.app/stats](https://meli-mutante.wilarizav.vercel.app/stats)

```json
{
  "count_mutant_dna": 0,
  "count_human_dna": 0,
  "ratio": 0
}
```

## COVERAGE

<p align="center">
  <a href="https://i.ibb.co/" target="blank"><img src="https://i.ibb.co/0nWZsTC/Screen-Shot-2020-07-21-at-3-19-03-AM.png" width="500" alt="coverage" /></a>
</p>

## License

[MIT](https://choosealicense.com/licenses/mit/)
