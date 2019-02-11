from pymongo import MongoClient

def main ():

     # Connection to the MongoDB Server
     mongoClient = MongoClient ('127.0.0.1:27017')
     # Connection to the database
     db = mongoClient.data_visual
     #Collection
     collection = db.Oil_Production

     Oil_Production_JSON = list(collection.find())

     print(Oil_Production_JSON)

if __name__ == "__main__":
         main ()
