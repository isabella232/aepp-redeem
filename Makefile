# build output folder
OUTPUTFOLDER = dist
# docker image
DOCKER_REGISTRY = apeunit
DOCKER_IMAGE = aepp-redeem
DOCKER_TAG = $(shell git describe --always)
# K8S
K8S_NAMESPACE = 'default'
K8S_DEPLOYMENT = 'aepp-redeem-mainnet'
# env
NODE_URL = 'https://sdk-mainnet.aepps.com'
NETWORK_ID = 'ae_mainnet'


.PHONY: list
list:
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$' | xargs

clean:
	@echo remove $(OUTPUTFOLDER) folder
	@rm -rf dist
	@echo done

build:
	@echo build release
	npm install && VUE_APP_EPOCH_URL=$(NODE_URL) VUE_APP_NETWORK_ID=$(NETWORK_ID) npm run build
	@echo done

docker-build:
	@echo build image
	docker build --build-arg NODE_URL='$(NODE_URL)' --build-arg NETWORK_ID='$(NETWORK_ID)' -t $(DOCKER_IMAGE) -f Dockerfile .
	docker tag $(DOCKER_IMAGE) $(DOCKER_REGISTRY)/$(DOCKER_IMAGE):$(DOCKER_TAG)
	@echo done

docker-push:
	@echo push image
	docker tag $(DOCKER_IMAGE) $(DOCKER_REGISTRY)/$(DOCKER_IMAGE):$(DOCKER_TAG)
	docker push $(DOCKER_REGISTRY)/$(DOCKER_IMAGE):$(DOCKER_TAG)
	@echo done

k8s-deploy:
	@echo deploy k8s
	kubectl -n $(K8S_NAMESPACE) set image deployment/$(K8S_DEPLOYMENT) $(DOCKER_IMAGE)=$(DOCKER_REGISTRY)/$(DOCKER_IMAGE):$(DOCKER_TAG)
	@echo done

k8s-rollback:
	@echo deploy k8s
	kubectl -n $(K8S_NAMESPACE) rollout undo deployment/$(K8S_DEPLOYMENT)
	@echo done

debug-start:
	npm install && npm run serve
