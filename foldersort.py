import os
from pathlib import Path
import tkinter as tk
from tkinter import filedialog, messagebox, scrolledtext

photo_exts = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'}
video_exts = {'.mp4', '.mov', '.avi', '.mkv', '.wmv', '.flv'}

def rename_files(folder_path, log_output):
    folder = Path(folder_path)
    if not folder.exists() or not folder.is_dir():
        messagebox.showerror("Error", "Invalid folder path.")
        return

    photos, videos = [], []

    for file in folder.iterdir():
        if file.is_file():
            ext = file.suffix.lower()
            if ext in photo_exts:
                photos.append(file)
            elif ext in video_exts:
                videos.append(file)

    photos.sort(key=lambda f: f.stat().st_mtime)
    videos.sort(key=lambda f: f.stat().st_mtime)

    # Rename photos
    for i, file in enumerate(photos, 1):
        new_name = f"photo{i}{file.suffix.lower()}"
        new_path = folder / new_name
        try:
            file.rename(new_path)
            log_output.insert(tk.END, f"📷 Renamed: {file.name} ➜ {new_name}\n")
        except Exception as e:
            log_output.insert(tk.END, f"❌ Error renaming {file.name}: {e}\n")

    # Rename videos
    for i, file in enumerate(videos, 1):
        new_name = f"video{i}{file.suffix.lower()}"
        new_path = folder / new_name
        try:
            file.rename(new_path)
            log_output.insert(tk.END, f"🎥 Renamed: {file.name} ➜ {new_name}\n")
        except Exception as e:
            log_output.insert(tk.END, f"❌ Error renaming {file.name}: {e}\n")

    log_output.insert(tk.END, "\n✅ Done!\n")
    log_output.see(tk.END)

def select_folder(log_output, folder_label):
    folder = filedialog.askdirectory()
    if folder:
        folder_label.config(text=folder)
        rename_files(folder, log_output)

# Build GUI
root = tk.Tk()
root.title("Photo & Video Renamer")
root.geometry("600x400")

tk.Label(root, text="Select a folder to rename photos/videos", font=("Arial", 12)).pack(pady=10)

folder_label = tk.Label(root, text="No folder selected", fg="gray")
folder_label.pack()

log_output = scrolledtext.ScrolledText(root, wrap=tk.WORD, width=70, height=15)
log_output.pack(padx=10, pady=10)

tk.Button(root, text="Select Folder and Start", command=lambda: select_folder(log_output, folder_label),
          font=("Arial", 12), bg="#4CAF50", fg="white").pack(pady=10)

root.mainloop()
