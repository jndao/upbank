# main file that starts and initiates the retrieval of 
# user data and the main command loop
import dataHelper as startup
import accountHelper as acc

commands = {
    'listAccounts' : 'listAccounts. Lists all accounts',
    'getAll' : 'getAll. Lists all data',
    'exit' : 'exit. Exit the terminal',
    'help' : 'help. print all commands'
}

def commandLoop(accountData):
    while True:
        startup.getUserAccounts()
        uInput = input("\ninput command. Type 'help' to list all commands\n> ")
        if uInput not in commands:
            print ("'%s' is an invalid Command." % uInput)
        elif uInput == 'help':
            for command in commands:
                print (commands[command])
        elif uInput == 'listAccounts':
            acc.listAccounts(accountData)
        elif uInput == 'getAll':
            acc.getAll(accountData)
        elif uInput == 'exit':
            print ('Now exiting upapp')
            exit()
        
# checks for previous user token in json
# if none exists, will prompt user to create another
def initialize():
    if not startup.checkPreviousUser():
        started = False
        print ("Previous user not found.")
        while not started:
            newToken = input("Please insert new user token below.\n> ")
            started = startup.addNewToken(newToken)
        print ("Welcome to the up app")
    else:
        print('Welcome back to the up app')


def main():
    initialize()
    accounts = startup.getUserAccounts()
    commandLoop(accounts)
    
if __name__ == "__main__":
    main()

