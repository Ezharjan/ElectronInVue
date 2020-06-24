<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <input type="file" id="read-file" name="fileContent" @click="ReadLocalFile()" />
        <input type="text" id="file-path" name="filePath" />
        <button id="should-read-as-text" @click="changeReadType()">{{readTypeMsg}}</button>
        <button id="read-file-in-nodejs" @click="ReadLocalFileInNodeJS()">Read Local File</button>
        <button id="write-file-in-nodejs" @click="WriteLocalFileInNodeJS()">Write Local File</button>
        <button id="db-insert" @click="InsertInfo()">Insert A Name</button>
        <button id="db-find" @click="FindInfo()">Find A Name</button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
    @Prop() private msg!: string;

    readTypeMsg = "Read As Text";
    shouldReadAsText = false;

    created() {
        // 何か処理
    }

    mounted() {
        // 何か処理
    }

    updated() {
        // 何か処理
    }

    destroyed() {
        // 何か処理
    }

    initialize(): void {
        this.shouldReadAsText = false;
    }

    changeReadType() {
        this.shouldReadAsText = !this.shouldReadAsText;
        console.log(this.shouldReadAsText);
        (this.shouldReadAsText && (this.readTypeMsg = "Read As Data")) ||
            (this.readTypeMsg = "Read As Text");
    }

    ReadLocalFile() {
        const fileInput: HTMLInputElement = document.querySelector(
            "#read-file"
        );
        // const that = this;
        // fileInput.onchange = function() {
        fileInput.onchange = () => {
            console.log("文件名:", fileInput.value);
            const filereader = new FileReader();
            const fileType = fileInput.files[0].type;
            console.log(this.shouldReadAsText);
            if (this.shouldReadAsText === true) {
                filereader.readAsText(fileInput.files[0], "gbk");
            } else {
                filereader.readAsDataURL(fileInput.files[0]);
            }
            filereader.onload = function() {
                if (/^image\[jpeg|png|gif]/.test(fileType)) {
                    console.log("Read image content: " + this.result);
                }
                console.log("Content read: " + this.result);
            };
        };
    }

    ReadLocalFileInNodeJS() {
        // let filePath = document.querySelector('#file-path').value;
        // console.log((globalThis as any).readConfig("D:/myText.txt"));
        console.log((window as any).readConfig("D:/myText.txt"));
        try {
            // console.log(window.readConfig(filePath));
        } catch (err) {
            console.log(err);
            console.error(
                "error occurred while getting the file path from input."
            );
        }
    }

    WriteLocalFileInNodeJS() {
        const readFiler = require("../preload");
        readFiler();

        const filePath: HTMLInputElement = document.querySelector("#file-path")[
            "value"
        ];

        try {
            // window.writeFileConfig(
            // (window as any).writeFileConfig(
            dunyah.writeFileConfig(
                // globalThis.writeFileConfig(
                // filePath,
                "D:/rrr.txt",
                "Something you want to write in the file."
            );
        } catch (err) {
            console.log(err);
            console.error(
                "error occurred while getting the file path from input."
            );
        }
    }

    InsertInfo() {
        // window.insertInfo();---unusable
        this.DBOperation(0);
    }

    FindInfo() {
        // window.findInfo();---unusable
        this.DBOperation(1);
    }

    DBOperation(
        insertOrFind = 0,
        nameToInsert = "Alexander",
        ageToInsert = 25,
        rankToInsert = 1
    ) {
        /*  const NeDB = require("nedb"); //note: if errors happen, try: npm i @types/node -D and restart vscode
        const db = new NeDB({
            filename: "./user.db",
            autoload: true
        });

        if (insertOrFind === 0) {
            db.insert(
                {
                    name: nameToInsert,
                    age: ageToInsert,
                    rank: rankToInsert
                },
                function(err, doc) {
                    console.log("inserted:", doc);
                }
            );
        } else {
            db.find(
                {
                    name: nameToInsert
                },
                function(err, docs) {
                    console.log(nameToInsert + " found:", docs);
                }
            );
        } */
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
