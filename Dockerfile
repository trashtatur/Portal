FROM mysql:8.0

ENV MYSQL_DATABASE=portal \
    MYSQL_USER=MeinDBUser \
    MYSQL_PASSWORD=MEINSUPERPASSWORT \
    MYSQL_ROOT_PASSWORD=root

EXPOSE 3306

HEALTHCHECK --interval=5s --timeout=5s --retries=20 CMD mysqladmin ping -h localhost -u root -p"$MYSQL_ROOT_PASSWORD" || exit 1