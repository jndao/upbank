# Simple helper function file to help with the ease of use of app
import requests
import unicodedata

import json

statusCodes = {
    "200" : "success",
    "201" : "successPost",
    "204" : "successDelete",
    "400" : "badRequest",
    "401" : "badAuth",
    "404" : "badEndpoint",
    "422" : "badData",
    "429" : "badRequestAmount"
}
userData = {
    "url" : "https://api.up.com.au/api/v1/util/ping",
    "accountsUrl" : "https://api.up.com.au/api/v1/accounts",
    "token" : None
}

# updates userData.json with data
def updateUserData():
    with open('userData.json', 'w+') as data:
        json.dump(userData, data)

# Token is string
# pings response to check token
def checkToken(token):
    url = "https://api.up.com.au/api/v1/util/ping"
    header = {'Authorization' : 'Bearer ' + token}
    r = requests.get(userData["url"], headers=header)
    # Status code for error response
    if (r.status_code != 200) :
        raise ValueError("BAD TOKEN")

# Checks if there is a json file with valid token exists
# stores token if success
def checkPreviousUser():
    #attempt to check
    try:
        #Check json exists
        with open('userData.json', 'r') as data:
            data = json.load(data)
            checkToken(data["token"])
            # set token when successful
            userData["token"] = data["token"]
        return True
    except:
        return False
    
# checks token and adds if valid
# raises valueerror else
def addNewToken(token):
    try:
        checkToken(str(token))
        userData["token"] = str(token)
        updateUserData()
        return True
    except ValueError:
        print ("Token incorrect. Please input valid token or visit https://developer.up.com.au/ to get a new token")
        return False
    

# gets user data by requesting API
def getUserAccounts():
    header = {'Authorization' : 'Bearer ' + userData["token"]}
    payload = {'page[size]' : '1'}
    accountData = requests.get(userData['accountsUrl'], headers=header, params=payload).json()
    return accountData
    
def getNextData(nextURL):
    header = {'Authorization' : 'Bearer ' + userData["token"]}
    payload = {'page[size]' : '1'}
    nextData = requests.get(nextURL, headers=header, params=payload).json()
    return nextData

# given a json formatted data, will print out the details
# name
# account type
# balance (in AUD0)
def printAccountData(account):
    name = account['displayName']
    type = account['accountType']
    balance = account['balance']['value']

    print ('\n', name, type)
    print ("Account balance = %s" % balance)

