<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <button id="should-read-as-text" @click="textChanger()">{{readTypeMsg}}</button>
        <button id="read-file-in-nodejs" @click="ReadLocalFileInNodeJS()">Read Local File</button>
        <button id="write-file-in-nodejs" @click="WriteLocalFileInNodeJS()">Write Local File</button>
        <button id="db-insert" @click="InsertInfo()">Insert A Name</button>
        <button id="db-find" @click="FindInfo()">Find A Name</button>
        <button id="start-listening" @click="StartListening()">Listen</button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { readFile, readFileSync, writeFile, writeFileSync } from "fs";
import { remote } from "electron";

@Component
export default class HelloWorld extends Vue {
    @Prop() private msg!: string;

    private db = remote.getGlobal("myDB");
    private tcpServer = remote.getGlobal("myServer");

    readTypeMsg = "Text Changed";
    shouldChangeText = false;

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
        this.shouldChangeText = false;
    }

    textChanger(): void {
        this.shouldChangeText = !this.shouldChangeText;
        console.log(this.shouldChangeText);
        (this.shouldChangeText && (this.readTypeMsg = "Change Text")) ||
            (this.readTypeMsg = "Text Changed");
    }

    ReadLocalFile(): void {
        console.log("not supported yet!");
    }

    ReadLocalFileInNodeJS(): void {
        // //Using 'readFile' is not recomended here, use 'readFileSync' instead
        try {
            console.log(readFileSync("D:/myText.txt"));
        } catch (err) {
            console.log(
                "Please place a myText.txt file in disk-D or revise the code above"
            );
        }
    }

    WriteLocalFileInNodeJS(): void {
        //Using 'writeFile' is not recomended here, use 'writeFileSync' instead
        writeFileSync("D:/test.txt", "This is a testing file.");
    }

    InsertInfo(): void {
        alert("Are you sure to insert?");
        this.DBOperation(0);
    }

    FindInfo(): void {
        console.log("Find the names...");
        this.DBOperation(1);
    }

    DBOperation(
        insertOrFind = 0,
        nameToInsert = "Alexander",
        ageToInsert = 25,
        rankToInsert = 1
    ) {
        //Create the database in the main process --- background.js

        if (insertOrFind === 0) {
            this.db.insert(
                {
                    name: nameToInsert,
                    age: ageToInsert,
                    rank: rankToInsert
                },
                function(err: any, doc: any) {
                    console.log("inserted:", doc);
                }
            );
        } else {
            this.db.find(
                {
                    name: nameToInsert
                },
                function(err: any, docs: any) {
                    console.log(nameToInsert + " found:", docs);
                }
            );
        }
    }

    StartListening() {
        /* 启动监听 */
        this.tcpServer.listen(4000, () => {
            console.log("listening... \n");
        });
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
