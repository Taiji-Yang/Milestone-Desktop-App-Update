from flask import Flask, request, render_template, redirect
import os
import pandas as pd

app = Flask(__name__)
dfs = pd.read_excel('milestones.xlsx', sheet_name=None, engine='openpyxl')
print(type(dfs), type(dfs['Sheet1']), list(dfs['Sheet1']['Milestone']), list(dfs['Sheet1']['Completion date']) )


@app.route('/GetData', methods = ['GET'])
def api():
    try:
        import tkinter as tk
        from tkinter import ttk
        from tkinter import filedialog
        root = tk.Tk()
        root.withdraw()
        filename = filedialog.askopenfilename()
        print("filename------",filename)
        root.destroy()

        dfs = pd.read_excel(filename, sheet_name=None, engine='openpyxl')
    except:
        return {
        "Milestones":['nodata'],
        "Dates":['nodata']
    }
    else:
        return {
            "Milestones":list(dfs['Sheet1']['Milestone']),
            "Dates":list(dfs['Sheet1']['Completion date'])
        }

@app.route('/PostData', methods = ['POST'])
def databasepost():
    try:
        import tkinter as tk
        from tkinter import ttk
        from tkinter import filedialog
        root = tk.Tk()
        root.withdraw()
        filename = filedialog.asksaveasfilename()
        print("filename ^^^^^^^^^^^^^^^^^^^^^^^",filename)
        root.destroy()

        json_data = request.json
        data = json_data["DataOnTable"]
        df1 = pd.DataFrame(data, columns=['milestone', 'date'])
        df1.to_excel(filename)
    except:
        return {'status':'bad'}
    else:
        return {'status':'ok'}

if __name__ == "__main__":
    #db.create_all()
    app.run(debug=True)