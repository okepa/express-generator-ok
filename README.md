# express-generator-ok

## Installation

```bash
$ npm install express-generator-ok -g
```

## Run Application

Choose the name of your project and create it using:   

```bash
$ gen-ok -n <name>
```

Navigate to your project:

```bash
$ cd <name>
```

Install dependencies:

```bash
$ npm install
```

Run your app.js project locally at `http://localhost:3000/`:

```bash
$ node app.js
```

## Command Line Options

This generator can also be further configured with the following command line flags.

    -h, --help          output usage information
        --version       output the version number
    -n, --name <name>   Project name

## Info

The express-generator-ok generates a blank express project with a rMVC structure with blank routes.
It uses an ejs javascript template and also includes the materialize framework. 
It generates a Procfile if you want to deploy your project to heroku.
