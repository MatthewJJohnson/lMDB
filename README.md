# lMDB
#Skills Test ReadMe

BREAKDOWN OF BACKEND:
 python and node environments were created on windows (sin acknowledged)
 PYTHON VERSION: 3.6
 PYTHON RUN OPTIONS: --port=4433
 PYTHON ENV VARIABLES: PYDEVD_USE_CYTHON=NO;PYDEVD_USE_FRAME_EVAL=NO (for windows pycharm)
 
BREAKDOWN OF SQL:
 connected to a local instance of psql on windows
 database may be rebuilt from dump, DDL supplied

BREAKDOWN OF _ref FILES:
 framework_ref (links to pages that I used fairly extensively to start the project or learn components I had no experience with)
 open_source_ref (links to pages that I took large snippets of code from with no real impact to the skills test)
 syntax_ref (links to all the pages I remembered to write down for simple syntax help when writing code sections)
 

BREAKDOWN OF REQUIREMENTS:
Build a web app that allows users to:
    list movies (implemented via frontend to backend route and utilizing database)
    search movies (implemented via frontend framework. There is no search time penalty to this approach, all data is loaded initially. Pagination allows displaying max rows for full searches).
    add movies (implemented via frontend to backend route and utilizing database)
    edit movies (implemented via frontend to backend route and utilizing database)
    delete movies(implemented via frontend to backend route and utilizing database)
The movies should be stored in a database (postgres selected) and the ERROR FREE version of the original csv is here https://drive.google.com/file/d/1_Go8tlBhn0EIwIt2rUiOIj8qqSUswT8y/view?usp=sharing
The architecture should have a process for ingesting that csv into the database. (implemented via react package)
Make use of a Python framework (flask selected)
Create a React frontend for your users to allow them to perform operations on the database more easily. (This is about the most react I have ever written, bar a few weeks of tinkering on a senior design project a couple years ago. While some of the frontend does not follow react best practices, I believe it is suitable for this project).


