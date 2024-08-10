migrate:
	docker exec -it express npx prisma migrate dev --name $(name)
