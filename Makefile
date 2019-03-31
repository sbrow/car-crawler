PROJECT_NAME=${shell basename `pwd`}

all: docker bin/docker.sh

.PHONY: docker
docker:
	$@ build --rm -t $(PROJECT_NAME) .

bin:
	mkdir bin

bin/docker.sh: bin
	echo "docker run -it --rm --name web-scraper crawler" > bin/docker.sh

clean:
	rm -rf node_modules
	rm -f package-lock.json