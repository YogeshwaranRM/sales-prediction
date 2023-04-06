from flask import Flask, request,jsonify,send_file,url_for
from werkzeug.utils import secure_filename
import os
import pandas as pd
from flask_cors import CORS
import csv
import matplotlib.pyplot as plt
import base64
import io


from contextlib import nullcontext
import datetime
from functools import wraps
from http.client import HTTPException
from flask import Flask,request,jsonify,session
import json
import pandas as pd
import numpy as np
import warnings
from pylab import rcParams
import statsmodels.api as sm
from dateutil import parser
from sklearn.metrics import mean_squared_error
from math import sqrt
from sklearn import metrics
import warnings
from statsmodels.tools.sm_exceptions import ConvergenceWarning

app = Flask(__name__)
CORS(app)

def post_value():
    value = request.json['value']
    return jsonify(value)

period = ''
predictcol = ''
numeric = ''

@app.route('/post-value', methods=['POST'])
def post():
    global period, predictcol, numeric
    period = request.json['value1']
    predictcol = request.json['value2']
    numeric = request.json['value3']
    return 'success'
       
@app.route('/getting')
def func():
        title="some title"
        file=pd.read_csv('./data/train.csv')
        predictColumn=predictcol #request.form.get('predictColumn')
        # periodicity=request.form.get('periodicity')
        periodicity=period
        numbericalValue=numeric
        #request.form.get('numericalValue')
        
        if(periodicity=='Yearly'):
            freq='Y'
        elif(periodicity=='Monthly'):
            freq='M'
        elif(periodicity=='Weekly'):
            freq='W'
        elif(periodicity=='Daily'):
            freq='D'

        data=pd.read_csv('./data/train.csv')
        data['item'].unique()
        data['item'] = pd.factorize(data.item)[0] + 1
        data['date'] = pd.to_datetime(data['date'])

        df = pd.DataFrame(data)
        data.sort_values(by = ['date'], inplace = True)
        data.set_index('date', inplace = True)
        df.sort_values(by = ['date'], inplace = True, ascending = True)
        df.set_index('date', inplace = True)
        new_data = pd.DataFrame(df[predictColumn])
        new_data = pd.DataFrame(new_data[predictColumn].resample(freq).mean())
        new_data = new_data.interpolate(method = 'linear')

        train, test, validation = np.split(new_data[predictColumn].sample(frac = 1), [int(.6*len(new_data[predictColumn])), int(.8*len(new_data[predictColumn]))])
        print('Train Dataset')
        print(train)
        print('Test Dataset')
        print(test)
        print('Validation Dataset')
        print(validation)


        mod = sm.tsa.statespace.SARIMAX(new_data,
                                order=(1, 1, 1),
                                seasonal_order=(1, 1, 1, 12),
                                enforce_invertibility=False)
        results = mod.fit()

        
        pred = results.get_prediction()
        pred.conf_int()
        y_forecasted = pred.predicted_mean
        y_truth = new_data[predictColumn]

        mse = mean_squared_error(y_truth,y_forecasted)
        rmse = sqrt(mse)
        mae=metrics.mean_absolute_error(y_forecasted, y_truth)
        mape=metrics.mean_absolute_percentage_error( y_truth,y_forecasted)
        mape=round(mape*100, 2)
        
        
        forecast = results.forecast(steps=int(numbericalValue))
        forecast = forecast.astype('float')
        forecast_df = forecast.to_frame()
        forecast_df.reset_index(level=0, inplace=True)
        forecast_df.columns = ['PredictionDate', 'PredictedColumn']
        
        
        print(forecast_df)
        frame= pd.DataFrame(forecast_df)
        frameDict=frame.to_dict('records')
        
        predicted_date=[]
        predicted_column=[]
        for i in range(0,len(frameDict)):
            predicted_column.append(frameDict[i]['PredictedColumn'])
            tempStr=str(frameDict[i]['PredictionDate'])
            dt = parser.parse(tempStr)
            predicted_date.append(dt.strftime('%a')[0:3]+', '+str(dt.day)+' '+dt.strftime("%b")[0:3]+' '+str(dt.year))    
        Errors={'currentPrediction':{
            "mae":mae, "mape":mape,"mse":mse,"predictedColumn":predicted_column,"predictedDate":predicted_date,"rmse":rmse,"title":title,"predictedColumnName":'Predicted '+predictColumn.lower(),"columnName":predictColumn.capitalize(),"periodicity":periodicity,"numericalValue":numbericalValue
            }}
        list=[mae,mape,rmse,mse]


        path = './data/prediction.csv'
        prediction =frame.to_csv(path,index=False)
        dfd = pd.read_csv(path)
        print("here")
        print(Errors)
        print("frameassssssssssssss")
        print(frame.head())
        frame.plot(kind='bar',x='PredictionDate',y='PredictedColumn',color='green')
        plt.title('BarPlot')
        filename = 'bar_chart.png'
        plt.savefig(filename)

        plt.clf()  # clear the current figure to create a new one

        frame.plot(kind='line',x='PredictedColumn',y='PredictionDate',color='green')
        plt.title('LinePlot')
        filename2 = 'line.png'
        plt.savefig(filename2)


    # Get the absolute path of the file
        filepath = os.path.abspath(filename)
        filepath2=os.path.abspath(filename2)
        new_path = os.path.join("D:/Angular/Sales-Forecasting/src/assets", filename)
        new_path2 = os.path.join("D:/Angular/Sales-Forecasting/src/assets/linechart", filename2)
        os.replace(filepath, new_path)
        os.replace(filepath2,new_path2)
        # plt.show()
        print(frame.head())
        # print(jsonify(data="Predicted"))
        print("----------------------------------------")
        print(list)
        response={'mae':mae}
        return jsonify(list)

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
print(APP_ROOT)
UPLOAD_FOLD = '/files'
UPLOAD_FOLDER = os.path.join(APP_ROOT, UPLOAD_FOLD)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER



# csv---------------------------------
@app.route('/data')
def get_data():
    file = pd.read_csv('D://files//train.csv')
    data = file.head(7).to_dict(orient='records')
    return jsonify(data)



@app.route('/',methods=['GET'])
def get():
    return " Flask works"

@app.route('/fileupload', methods=['POST'])
def upload_file():
    print(request.files)

    if 'file' not in request.files:
        print('no file in request')
        return ''
    file = request.files['file']
    if file.filename == '':
        print('no selected file')
        return ''
    if file:
        filename = "train.csv"
        file.save(os.path.join('D:\Angular\Sales-Forecasting\data', filename))
        print(filename)
    print('end')
    return ''

# plots-------------------------------------

@app.route('/plot')
def plot():
    # Create data for the bar chart
    labels = ['A', 'B', 'C', 'D', 'E']
    values = [10, 8, 6, 7, 12]

    # Create the bar chart
    plt.bar(labels, values)

    # Save the chart to a file
    filename = 'bar_chart.png'
    plt.savefig(filename)

    # Get the absolute path of the file
    filepath = os.path.abspath(filename)
    new_path = os.path.join("D:/Angular/Sales-Forecasting/src/assets", filename)
    os.replace(filepath, new_path)
    return jsonify({'path':new_path})




if __name__ == '__main__':
    app.run()

