# Aplicación de notas React-Firebase
Para correr la aplicación se deben establecer las variables de entorno

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__
* Firebase API key:
```
REACT_APP_APIKEY=tuapikey
```

* Firebase __authDomain__ (requerido en la configuración de Firebase):
```
REACT_APP_AUTHDOMAIN=authdomain
```

* Id del proyecto en Firebase:
```
REACT_APP_PROJECTID=projectid
```

* Firebase __storageBucket__:
```
REACT_APP_STORAGEBUCKET=storagebucket
```

* Firebase __messagingSenderId__:
```
REACT_APP_MESSAGINGSENDERID=messagingsenderid
```

* Firebase __appId__:
```
REACT_APP_APPID=appid
```

## Reconstruir los módulos de node y levantar el proyecto en local
```
npm install
npm start
```