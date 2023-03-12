# Event sourcing seed node (task-app)

## note :
Ce projet est en cours de développement, seul les couche kafka et express sont 
implémentées, mongo sera à venir dans les prochains commits 😉

## premier démarrage :

<ul>
    <li>
        Installer les dépendances 😅
    </li>
</ul>

```shell
npm install
```

<ul>
    <li>
        Il faut deployer le docker-compose.yml (pour kafka et mongo)
    </li>
    <li>
        il faut creer les topics kafka utilisés pour l'event sourcing
        (à faire une fois seulement)
    </li>
</ul>

```shell
npm run create-topics-kafka
```
<ul>
    <li>
        il reste plus qu'à lancer l'application ce qui lancera l'engine kafka et les routes api 😎
    </li>
</ul>

```shell
npm start
```

## libs

<ul>
    <li>pour kafka = <a href="https://www.npmjs.com/package/kafka-node?activeTab=readme">kafka-node</a></li>
    <li>pour env = <a href="https://www.npmjs.com/package/dotenv">dotenv</a></li>
    <li>pour api = <a href="https://www.npmjs.com/package/express">express</a></li>
</ul>

