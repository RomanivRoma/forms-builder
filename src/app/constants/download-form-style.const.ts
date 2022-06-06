export const cDownloadStyles: string = `
                <style>
                    .drop__container{
                    border-radius: 5px;
                    padding: 13px;
                    }
                    .drop__item__container {
                    display: flex;
                    }
                    .drop__container .drop__header{
                        background: rgb(19, 192, 13);
                        color: #fff;
                        border-top-left-radius: 5px;
                        border-top-right-radius: 5px;
                    }
                    .drop__container p{
                    margin: 0;
                    }
                    .drop__container .drop__header h1{
                        margin: 0;
                        padding: 15px;
                        font-size: 29px;
                    }
                    .dragElements__item input,
                    .dragElements__item textarea,
                    .dragElements__item p,
                    .dragElements__item select{
                        margin: 5px;
                    }
                    .drop__container .drop__wrapper{
                        border: 2px solid rgb(163, 163, 163);
                        border-bottom-left-radius: 5px;
                        border-bottom-right-radius: 5px;
                    }
                    .drop__container .drop__body{
                    display: flex;
                    flex-wrap: wrap;
                    padding: 15px;
                    }
                    .dragElements__item {
                        display: flex;
                        align-items: center;
                    }
                    .dragElements__item {
                    width: 100%;
                    }
                    ::-webkit-scrollbar-track{
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                    border-radius: 10px;
                    background-color: #F5F5F5;
                    }

                    ::-webkit-scrollbar{
                    width: 8px;
                    height: 8px;
                    background-color: #F5F5F5;
                    border-radius: 10px;
                    }

                    ::-webkit-scrollbar-thumb{
                    border-radius: 10px;
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                    background-color: #555;
                    }

                </style>`;