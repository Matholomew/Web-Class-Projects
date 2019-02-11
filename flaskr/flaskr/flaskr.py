# all the imports
import os
from mongoengine import *
from pymongo import MongoClient
from bson.json_util import dumps

connect('data_visual')

from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash

from mongoengine import *

connect('data_visual')      # Connect to data_visual database

app = Flask(__name__) # create the application instance :)
app.config.from_object(__name__) # load config from this file , flaskr.py

# Load default config and override config from an environment variable
app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'flaskr.db'),
    SECRET_KEY='development key',
    USERNAME='admin',
    PASSWORD='default'
))
app.config.from_envvar('FLASKR_SETTINGS', silent=True)

@app.route('/')

# Route to index page
@app.route('/index')
def show_index():
	return render_template('index.html')

# Route to charts page
@app.route('/charts.html')
def show_datatables():
	return render_template('charts.html')

# Route to inspirations page
@app.route('/inspiration.html')
def show_inspiration():
    return render_template('inspiration.html')

# Route to add data api
@app.route('/add', methods=['POST'])
def add_entry():
    if not session.get('logged_in'):
        abort(401)
    flash('New entry was successfully posted')
    return redirect(url_for('show_entries'))

# Route to add oilData api
@app.route('/oilData', methods=['GET'])
                                                            # The method to get the data
def getData():
     mongoClient = MongoClient ('127.0.0.1:27017')
     db = mongoClient.data_visual       # Create database instance
     collection = db.Oil_Production        # Get Oil_Production database collection
     Oil_Production_JSON = collection.find()        # Get all db entries from the collection

     collection = db.Oil_Consumption       # Get Oil_Consumption database collection
     Oil_Consumption_JSON = collection.find()       # Get all db entries from the collection

     dataObjects = []             # Make a temp array to hold the extract data objects

    # Loop through oil_production json
     for i in range(Oil_Production_JSON.count()):
         proCountry = Oil_Production_JSON[i].get("Crude oil production, per capita (toe)")      #Get the oil pro country
         conTest = db.Oil_Consumption.find({"Oil Consumption per capita (tonnes per year)" : proCountry})       # Get the country using collection find
         for x in range(conTest.count()):           # Loop through country collection data matching country names
             #find in db oil-con where countryname = countryname
             if conTest[x].get("Oil Consumption per capita (tonnes per year)") == proCountry:       # If it's a match create a data object
                 littleObject = {'oilPro':Oil_Production_JSON[i], 'oilCon':conTest[x]}
                 dataObjects.append(littleObject)               # Push that data object to the dataObjects array
             else:
                 littleObject = {'oilPro':Oil_Production_JSON[i]}       #Otherwise just create a data object of only the production data
                 dataObjects.append(littleObject)               # Push that data object to the dataObjects array

     return dumps(dataObjects)

