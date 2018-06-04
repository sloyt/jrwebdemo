Проект демонстрирует как загрузить список отчетов с JasperReports Server и вызвать выбранный отчет на отображение.

База проекта создана с помощью [Create React App](https://github.com/facebookincubator/create-react-app).

## Содержание

- [Загрузка списка проектов](#загрузка-списка-проектов)
- [Загрузка отчета](#загрузка-отчета)
- [Необходимые настройки на сервере JasperReports](#необходимые-настройки-на-сервере-jasperreports)

## Загрузка списка проектов

Для загрузки списка проектов используется метод REST API: `<server-address>/jasperserver/rest_v2/resources`

Параметры вызова:
- `folderUri`, папка относительно корня, в которой искать объекты (ресурсы),
- `type`, тип ресурса для поиска (отчет - **reportUnit**),
- `recursive`, искать ли во вложенных папках (по умолчанию **true**).

В ответ сервис возвращает массив `resourceLookup` из объектов вида:
```json
{
    "version": 0,
    "permissionMask": 30,
    "creationDate": "2018-05-29T08:20:46",
    "updateDate": "2018-05-29T08:20:46",
    "label": "events by hosts interactive",
    "description": "",
    "uri": "/reports/events_by_hosts_interactive",
    "resourceType": "reportUnit"
}
```

## Загрузка отчета

Для загрузки отчета в интерактивном режиме используется специальная страница `flow.html`. 
Загрузка выполняется путем вставки `iFrame`. 
Аутентификация сейчас выполняется путем передачи имени пользователя и пароля в GET-параметрах ссылки.

Пример ссылки: `<server-address>/jasperserver/flow.html?_flowId=viewReportFlow&ParentFolderUri=/reports&reportUnit=hosts&standAlone=true&decorate=no&j_username=<username>&j_password=<password>`

## Необходимые настройки на сервере JasperReports

В конфигурацию Apache2 сервера, который принимает запросы из Интернет, необходимо добавить ряд настроек:
- добавление заголовков CORS:
```
    Header add Access-Control-Allow-Origin "*"
    Header add Access-Control-Allow-Headers "Origin, Content-Type, Authorization, X-REMOTE-DOMAIN"
    Header add Access-Control-Allow-Methods "PUT, GET, POST, DELETE, OPTIONS"
```
- отмену заголовка X-Frame-Options:
```
    Header always unset X-Frame-Options
```
- обход аутентификации для http-метода OPTIONS:
```
    RewriteEngine On
    RewriteCond %{REQUEST_METHOD} OPTIONS
    RewriteRule ^(.*)$ /index.html [QSA,L]
```

Итоговые изменения в конфигурацию выглядят следующим образом:
```
<IfModule mod_headers.c>
    Header add Access-Control-Allow-Origin "*"
    Header add Access-Control-Allow-Headers "Origin, Content-Type, Authorization, X-REMOTE-DOMAIN"
    Header add Access-Control-Allow-Methods "PUT, GET, POST, DELETE, OPTIONS"
    Header always unset X-Frame-Options
</IfModule>
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_METHOD} OPTIONS
    RewriteRule ^(.*)$ /index.html [QSA,L]
</IfModule>
```
