FROM python:3.12
WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
CMD ["streamlit", "run", "app.py", "--server.address=0.0.0.0"]

