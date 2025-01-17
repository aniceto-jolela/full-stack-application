# full-stack-application
Task: Build a full-stack application to manage a user directory.

> Requirements:

- A frontend using React with Material-UI:
- A login
- A form to add a user (name, email, role).
- A table to list all users.
- A backend using Django:
- APIs for CRUD operations on users.
- Store user data in a PostgreSQL database.
- Implement basic security:
- CSRF protection.
- Validate input to prevent SQL injection.

#

> Steps
1. install PostgreSQL
    ```bash
    sudo apt install postgresql   
    ```

    ```bash
    psql --version
    ```
2. install Psycopg (to CPython)
   - tip -> Database adapter
   ```bash
   pip install "psycopg[binary]"
   ```
3. install Dotenv
   ```bash
   pip install python-dotenv
   ```
4. login in the postgresql shell
   ```bash
   sudo -u postgres psql
   ```
5. Connection pools
   ```shell
   pip install "psycopg[pool]"
   ```
6. Rest
   ```shell
   pip install djangorestframework
   ```
7. Rest-sjwt
   ```shell
   pip install djangorestframework-simplejwt
   ```
8. Nodejs
   ```shell
   sudo apt-get install -y curl
   ```
   ```shell
   curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh
   ```
   ```shell
   sudo -E bash nodesource_setup.sh
   ```
   ```shell
   sudo apt-get install -y nodejs
   ```
   ```shell
   node -v
   ```
9. Vite + React (variant TypeScript)
   ```shell
   npm create vite@latest frontend --template react
   ```
10. Material UI
   ```shell
   npm install @mui/material @emotion/react @emotion/styled
   ```
11. Router
   ```shell
   npm install react-router-dom
   ```
12. SQL
   ```bash
   postgres=# CREATE USER ??? WITH PASSWORD 'xxxx';
   CREATE ROLE
   postgres=# CREATE DATABASE xxxx OWNER ???;
   CREATE DATABASE
   postgres=# GRANT ALL PRIVILEGES ON DATABASE xxx TO ???;
   GRANT
   ```
13. Apply
   ```shell
   python manage.py migrate
   ```
14. Create super user
   ```shell
   python manage.py createsuperuser
   ```
15. [Cross-Origin Resource Sharing (CORS)](https://pypi.org/project/django-cors-headers/)
   ```shell
   pip install django-cors-headers
   ```
16. axios and jwt-decode
   ```shell
   npm install axios jwt-decode
   ```



#
 > Versions
>> python 3.12.4 <br/>
>> postgresql 14.5 <br/>
>> pip 24.3.1 <br/>
>> psycopg 3.2.3 <br/>
>> psycopg-binary 3.2.3 <br/>
>> python-dotenv 1.0.1 <br/>
>> psycopg-pool 3.2.4 <br/>
>> djangorestframework 3.15.2 <br/>
>> markdown-3.7 <br/>
>> django-filter-24.3 <br/>
>> node v22.13.0 <br/>
>> npm 10.9.2 <br/>
>> react 18.3.1 <br/>
>> mui 11.14.0 <br/>
>> vite 6.0.5 <br/>
>> pyjwt 2.10.1 <br/>




 ## References
##### Backend
[django](https://docs.djangoproject.com/) <br/>
[postgresql](https://www.postgresql.org) <br/>
[psycopg](https://www.psycopg.org) <br/>
[drf](https://www.django-rest-framework.org/) <br/>
[drf-simplejwt](https://django-rest-framework-simplejwt.readthedocs.io/) <br/>
[python](https://docs.python.org) <br/>
Before with nvm (Many versions) [nodejs](https://nodejs.org) <br/>
Now (A version) [nodejs](https://github.com/nodesource/distributions) <br/>

##### Frontend
[react](https://react.dev/) <br/>
[vite](https://vite.dev/) <br/>
[mui](https://mui.com/) <br/>












