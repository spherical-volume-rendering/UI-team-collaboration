from flask import Flask, render_template
from flask import request, jsonify
import time

import matplotlib
import yt
import numpy as np

matplotlib.use('agg')

app = Flask(__name__)
app.secret_key = 's3cr3t'
app.debug = True


@app.route('/')
def index():
    return render_template('/index.html')


@app.route('/background_process')
def background_process():
    #read the RGB values from the UI
    redValues = np.asarray(eval(request.args.get('redValues')))
    greenValues = np.asarray(eval(request.args.get('greenValues')))
    blueValues = np.asarray(eval(request.args.get('blueValues')))
    #create a random image name 
    img_name = int(round(time.time() * 1000))

    assignValues(redValues, greenValues, blueValues, str(img_name))
    
    #send back to the UI the image name to display
    return jsonify(result= img_name)
		

    
def assignValues(redVal, greenVal, blueVal, resultname):
    
        ctf = yt.ColorTransferFunction( (-10.0, -5.0) )
        ctf.add_layers(8)
        #assign the recieved RGB values to ColorTransferFunction
        ctf.red.y = redVal
        ctf.green.y = greenVal
        ctf.blue.y = blueVal
        #plot the img
        ctf.plot("static/img/"+resultname+".png")
        
        
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)