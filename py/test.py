import glob
import shutil,os
save = "C:/Users/motoya_hp/OrenjiAme.github.io/www/img/tmp/"
path = "C:/Users/motoya_hp/OrenjiAme.github.io/www/img/*.gif"
l = glob.glob(path)
for i in l:
    if i in ["m0","s0","p0"]:pass
    name = i.split("\\")[1]
    #print(name) 
    shutil.copy(l[-2],save+name)