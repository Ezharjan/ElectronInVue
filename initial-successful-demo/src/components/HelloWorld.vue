<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <!-- <button @click="buttonClicked()">Clicker</button> -->
        <!-- <button @click="openLocalFile()">Clicker</button> -->
        <input type="file" id="file-input" name="fileContent" @click="openLocalFile()" />
        <button id="my-button" @click="openLocalFile2()">Click</button>
    </div>
</template>

<script>

export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    methods: {
        buttonClicked() {
            console.log("Button clicked just now!");
        },
        openLocalFile() {
            var fileInput = document.querySelector('#file-input');
            fileInput.onchange = function () {
                console.log('文件名:', this.value)
                var filereader = new FileReader();
                var fileType = this.files[0].type;
                filereader.readAsText(this.files[0], 'gbk');
                filereader.onload = function () {
                    if (/^image\[jpeg|png|gif]/.test(fileType)) {
                        console.log("Read image content: " + this.result);
                    }
                    console.log("***:" + this.result);
                }
                console.log("$$$: " + this.files[0]);
                // filereader.readAsDataURL(this.files[0]);
            }
        },
        openLocalFile2() {
            //本地文件写入
            // var path = "D:/myText.txt";
            // console.log(window.readFiles(path, function () {
            //     console.log('hhhh');
            // }));
            // console.log(path);


            //OK!!!
            // console.log(window.readConfig());

            window.writeFileConfig('D:/eee.txt', 'hello world', function () {
                console.log('done!');
            });

            // fs.writeFile(_path, "electron + Javascript", function (err) {
            //     if (!err)
            //         console.log("写入成功！")
            // })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
