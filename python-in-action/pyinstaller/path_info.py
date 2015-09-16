import json
import os

path_info = []
def read_info():
	global path_info
	f = open('path_info.json', 'r')
	path_info = json.load(f)
	f.close()

vbproj_list = []
def get_vbproj_list():
	global vbproj_list
	for path in path_info:
		for root, dirs, files in os.walk(path):
			for i in files:
				if i.endswith('.vbproj'):
					vbproj_list.append(os.path.join(root, i))

if __name__ == '__main__':
	read_info()
	get_vbproj_list()
	for i in vbproj_list:
		print i