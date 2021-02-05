import tkinter as tk

window = tk.Tk()
window.title("윈도우창 연습")
window.geometry("640x400+100+100")
window.resizable(False, False)

count = 0

def countUP():
    global count
    count += 1
    label.config(text=str(count))

label = tk.Label(window, text="0")
label.pack()

button = tk.Button(
    window, text= "증가합니다",
    overrelief="solid", 
    width=15, 
    command=countUP, 
    repeatdelay=1000, 
    repeatinterval= 100,
    highlightbackground="black",
    highlightcolor="white"
    )
button.pack()



window.mainloop()
