# helper file that parces json data

import requests
import unicodedata
import json

# all imports

from requests import NullHandler

# data helper functions
import dataHelper as dHelper

# lists all user account data (name and account balance)
def listAccounts(accountData):
    print (accountData)

def getAll(accountData):
    while True:
        data = accountData['data']
        for page in data:
            if page['type'] == 'accounts':
                dHelper.printAccountData(page['attributes'])
        if not accountData['links']['next']:
            break
        else:
            accountData = dHelper.getNextData(accountData['links']['next'])