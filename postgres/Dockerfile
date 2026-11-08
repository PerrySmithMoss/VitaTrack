FROM postgres:17.11-bookworm@sha256:665dc7b37ac52a17e298511414c21d23ffa4e6a6ef6225b3e5d59c7afb35e994

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get purge -y gpg libsqlite3-0 && \
    rm -rf /var/lib/apt/lists/* /usr/local/bin/gosu

# The upstream entrypoints use gosu to re-exec as the postgres user.
COPY --chmod=755 gosu /usr/local/bin/gosu
