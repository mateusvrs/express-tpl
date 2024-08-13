# Express API Template

This is a basic template for an Express API. It includes an example of a simple API to handle books and their authors. All CRUD operations are implemented. The main goal of this project is to provide a starting point for building an Express API. The template includes the following features and tools:

- **[TypeScript](https://www.typescriptlang.org/)**: A typed superset of JavaScript that compiles to plain JavaScript.
- **[Express](https://expressjs.com/)**: A fast, unopinionated, minimalist web framework for Node.js.
- **[Docker/Compose](https://www.docker.com/)**: A platform for developing, shipping, and running applications in containers.
- **[Prisma](https://www.prisma.io/)**: A modern database toolkit for TypeScript and Node.js.
- **[PostgreSQL](https://www.postgresql.org/)**: A powerful, open-source object-relational database system.
- **[Zod](https://zod.dev/)**: A TypeScript-first schema declaration and validation library.
- **[Jest](https://jestjs.io/)**: A delightful JavaScript Testing Framework with a focus on simplicity.
- **[Supertest](https://github.com/ladjs/supertest#readme)**: A high-level abstraction for testing HTTP.
- **[ESLint](https://eslint.org/)**: A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.

## :book: Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v20.16.0 or higher)
- [NPM](https://www.npmjs.com/get-npm) (v10.8.1 or higher)
- [Docker](https://www.docker.com/products/docker-desktop) (v26.1.3 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.27.0 or higher)
- [GNU Make](https://www.gnu.org/software/make/) (v4.3 or higher)

**P.S.:** If you are getting an error when running docker commands, you may need to run them with `sudo` even the `npm run` commands.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/mateusvrs/express-tpl.git
```

2. Install the dependencies and run the setup script:

```bash
npm install
npm run setup
```

3. Start the development server:

```bash
docker compose -f docker/docker-compose.yml up
```

4. Open your browser and navigate to `http://localhost:3000/docs` to see the API in action.

5. To stop the development server, run:

```bash
docker compose -f docker/docker-compose.yml down

# or # to remove volumes

docker compose -f docker/docker-compose.yml down -v
```

## :bar_chart: Testing

To run the tests, execute the following command:

```bash
npm test
```

The first time you run the tests the docker image will be built, so it may take a little longer. After that, the tests will run faster.

After running the tests the container will be removed as well as the volumes. Although, if something goes wrong and the container is not removed, you can run the following command:

```bash
docker compose -f docker/docker-compose.test.yml down -v
```

## :card_index_dividers: Database

The database is managed by Prisma. The current migrations are applied automatically when the container is started. If you need to create a new migration, you can run the following command **before starting the container**:

**P.S.:** Replace `{text_the_migration_name}` with the name of the migration. The name should be in snake_case.

```bash
make migrate name="{text_the_migration_name}"
```

## :hammer_and_wrench: Workflow

The project have a pre-configured GitHub Actions workflow that runs the tests on every push to the main branch and uploads the coverage report to Codecov. Also, the workflow runs ESLint to check the code style and apply possible fixes automatically.

If you want to set up the Codecov, you need to create an account on the platform and add the `CODECOV_TOKEN` secret to your repository. You can find the token on the Codecov website.

The workflow is simple and can be customized according to your needs.
