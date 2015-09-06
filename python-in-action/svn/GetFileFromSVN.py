#----------------------------------------------
# Author    : Jeff Yu
# Date      : 2012-8-13
# Function  : get files from SVN
#----------------------------------------------
 
#----------------------------------
# Step1: Get INFO
#----------------------------------
import sys,ConfigParser
 
try:
    configFile = open("config.ini","r")
except IOError:
    print "config.ini is not found"
    raw_input("")
    sys.exit()
 
config = ConfigParser.ConfigParser()
config.readfp(configFile)
configFile.close()
 
# get baseurl
try:
    baseurl = config.get("INFO","baseurl")
 
    # incase last "/" is missing in baseurl
    baseurl = baseurl.rstrip("/")
    baseurl = "%s/"%baseurl
except ConfigParser.NoOptionError: 
    print "baseurl is not found under section INFO in config.ini."
    raw_input("")
    sys.exit()
         
# get user
try: 
    user = config.get("INFO","user")
except ConfigParser.NoOptionError:   
    meg = "user is not found under section INFO in config.ini."
    raw_input("")
    sys.exit()
 
# get passwd    
try:
    passwd = config.get("INFO","passwd")
except ConfigParser.NoOptionError:
    meg = "passwd is not found under section INFO in config.ini."
    raw_input("")
    sys.exit()
 
# get fileList   
try: 
    fileList = config.get("INFO","fileList")
except ConfigParser.NoOptionError:
    meg = "fileList is not found under section INFO in config.ini."
    raw_input("")
    sys.exit()
 
 
#----------------------------------
# Step2: Auth
#----------------------------------
import urllib2
realm = "Subversion Repositories"
auth = urllib2.HTTPBasicAuthHandler()
auth.add_password(realm, baseurl, user, passwd)
opener = urllib2.build_opener(auth, urllib2.CacheFTPHandler)
urllib2.install_opener(opener)
 
 
#----------------------------------
# Step3: Create Folder
#----------------------------------
import os
folderName = "svnFile"
if not os.path.exists(folderName):
    os.mkdir(folderName)
 
 
#----------------------------------
# Step4: Get Files
#----------------------------------
fr = open(fileList,'r')
for i in fr:
    i = i.strip("\n")
    i = i.strip(" ")
     
    # ignore the blank line
    if i != "":
        url = "%s%s"%(baseurl,i)
 
        try:
            data = urllib2.urlopen(url)
 
            fw = open("%s/%s"%(folderName,i),'w')
            fw.write(data.read())
            fw.close()
 
            print "Download: %s."%i
 
        except urllib2.HTTPError, e:
            # HTTPError is a subclass of URLError
            # need to catch this exception first
            mesg = str(e).split(" ")
            errCode = mesg[2].rstrip(":")
             
            if errCode == "401":
                # HTTP Error 401: basic auth failed
                print "Can not login in, please check the user and passwd in config.ini."
                break
            elif errCode == "404":
                # HTTP Error 404: Not Found
                print "Not Found: %s"%i
            else:
                print e
                print "Failed to download %s"%i
 
        except urllib2.URLError:
            # 1.SVN server is down 
            # 2.URL is not correct
            print "Please check SVN Server status and baseurl in config.ini."
            break
 
fr.close()
raw_input("")