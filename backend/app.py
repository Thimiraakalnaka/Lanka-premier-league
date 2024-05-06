from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS 
import pickle 

app = Flask(__name__)

CORS(app,resources={r"/*":{"origins":"*"}})

model = pickle.load(open('Lplmodelfinal.pkl', 'rb'))

@app.route('/', methods=['GET'])
def get_data():
    data = {
        "message":"API is Running"
    }
    return jsonify(data)
  
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        batting_team = data['batting_team']
        bowling_team = data['bowling_team']
        city = data['city']
        target = float(data['target'])
        score = float(data['score'])
        overs = float(data['overs'])
        wickets = int(data['wickets'])

        runs_left = target - score
        balles_left = 120 - (overs * 6)
        wickets = 10 - wickets
        crr = score / overs
        rrr = (runs_left * 6) / balles_left

        input_df = pd.DataFrame({'batting_team': [batting_team],
                                 'bowling_team': [bowling_team],
                                 'city': [city],
                                 'runs_left': [runs_left],
                                 'balles_left': [balles_left],
                                 'wickets': [wickets],
                                 'total_runs_x': [target],
                                 'crr': [crr],
                                 'rrr': [rrr]})

        prediction = model.predict_proba(input_df)
        win_probability = prediction[0][1] * 100
        loss_probability = prediction[0][0] * 100

        return jsonify({'batting': batting_team, 'win': win_probability, 'bowling': bowling_team, 'loss': loss_probability})
    
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
