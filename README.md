# Instructions

## Download

Clone this repository from GitHub (HTTPS)

```shell
git clone https://github.com/zachgordon25/react-skeleton-app.git
```

Clone this repository from GitHub (SSH)

```shell
git clone git@github.com:zachgordon25/react-skeleton-app.git
```

## Setup backend

Change directory into backend

```shell
cd react-skeleton-app/backend
```

### Setup virtual environment

Create a Virtual Environment

```shell
python3 -m venv .venv
```

Activate Virtual Environment (MAC)

```shell
source .venv/bin/activate
```

Activate Virtual Environment (Windows)

```shell
source .venv\Scripts\activate
```

Upgrade PIP

```shell
pip3 install --upgrade pip
```

### Install Python packages

Install required Python packages

```shell
pip3 install -r requirements.txt
```

### Start your backend server

Start your backend server

```shell
flask run
```

Alternatively, you can ensure your server resets every time you make a change and in debug mode by typing:

```shell
python3 app.py
```

## Setup frontend

Change directory into frontend

```shell
cd ../frontend
```

Install packages

```shell
npm install
```

Start your frontend server

```shell
npm start
```

### go to http://localhost:3000 to see your app running!