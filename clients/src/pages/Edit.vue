<template>
  <div>
    <template v-if="allTests.length > 0">
      <q-card class="q-pa-lg q-mb-md" v-for="(test, index) in allTests" :key="index">
        <q-card-header class="text-h6">
          <div>
            Тест: {{ test.taskName }}
          </div>
          <div class="testCreated">
            Идентификатор: {{ test._id }}
          </div>
        </q-card-header>
        <q-card-actions align="between" class="q-px-none">
          <q-btn color="positive" label="Редактировать" @click="editModal = true; currentEditTask = test"></q-btn>
          <q-btn color="negative" label="Удалить" @click="deleteTest(test._id)"></q-btn>
        </q-card-actions>
      </q-card>
    </template>

    <q-card class="q-pa-lg" v-else>
      <div class="text-h6"> У вас еще нет тестов!</div>
    </q-card>

    <q-dialog v-model="editModal" persistent :maximized="editModal" transition-show="slide-up"
      transition-hide="slide-down">
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space></q-space>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <div class="text-h6">Редактирование задания</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-card class="modal">
            <q-card-section>
              <q-input v-model="currentEditTask.taskName" label="Название теста"></q-input>
            </q-card-section>
            <q-card-separator></q-card-separator>
            <q-card-section>
              <q-card class="q-ma-md task" v-for="(one, i) in currentEditTask.tasks" :key="one">
                <q-card-section class="text-h6">
                  Задание {{ i + 1 }}
                  <q-btn flat color="negative" icon="delete" @click="deleteTask(currentEditTask, i)"></q-btn>
                </q-card-section>
                <q-card-section>
                  <q-input label="Введите текст задания" v-model="one.text"></q-input>
                </q-card-section>
                <q-card-separator></q-card-separator>

                <q-card-section>
                  <q-card class="q-ma-md ansver" v-for="(ans, j) in one.ansvers" :key="j">
                    <q-card-section class="text-h7">
                      Ответ: {{ j + 1 }}
                      <q-btn flat color="negative" icon="delete" @click="deleteAns(one.ansvers, j)"></q-btn>
                    </q-card-section>

                    <q-separator></q-separator>

                    <q-card-section>
                      <q-input label="Текст ответа" v-model="ans.text"></q-input>
                      <q-checkbox label="Ответ является верным" v-model="ans.right"
                        @click="makeOnlyOneRight(one.ansvers, j)"></q-checkbox>
                    </q-card-section>

                  </q-card>
                  <q-btn flat color="positive" label="Добавить ответ" icon="add" @click="addAnsver(one.ansvers)"></q-btn>
                </q-card-section>
              </q-card>
              <q-btn flat label="Добавить задание" color="positive" icon="add" @click="addTask(currentEditTask)"></q-btn>
            </q-card-section>
            <q-card-actions align="between">
              <q-btn label="Сохранить" color="positive" @click="saveTest(currentEditTask, currentEditTask._id)"></q-btn>
              <q-btn label="Очистить" color="negative" @click="clearAll(currentEditTask)"></q-btn>
            </q-card-actions>
          </q-card>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { api } from "../boot/axios";
export default {
  setup() {
    return {
    };
  },
  data() {
    return {
      allTests: [],
      editModal: false,
      currentEditTask: null,
    };
  },
  mounted() {
    this.getAllTests();
  },
  methods: {
    async getAllTests() {
      const res = await api.get(
        "api/test",
        {
          headers: {
            "x-requested-with": "*",
          }
        }
      );
      if (res) {
        this.allTests = res.data;
      }
    },
    async deleteTest(id) {
      const res = await api.delete(
        "api/test/" + id,
        {
          headers: {
            "x-requested-with": "*",
          }
        }
      );
      if (res) {
        this.getAllTests();
      }
    },

    clearAll(object) {
      object.tasks = [];
      object.testName = '';
    },

    addTask(object) {
      let clone = {
        text: '',
        ansvers: []
      };
      object.tasks.push(clone);
    },

    deleteTask(object, index) {
      object.tasks.splice(index, 1)
    },

    async saveTest(object, id) {
      const res = await api.put(
        "api/test/" + id,
        {
          taskName: object.testName,
          tasks: object.tasks
        }, {
        headers: {
          "x-requested-with": "*",
        }
      }
      );
      if (res.status == 200) {
        this.$q.notify({
          type: 'positive',
          message: 'Изменения сохранены'
        });
      }
    },
    addAnsver(obj) {
      let clone = {
        text: '',
        right: false
      };
      obj.push(clone);
    },
    deleteAns(obj, index) {
      obj.splice(index, 1);
    },

    makeOnlyOneRight(parent, index) {
      for (let ind = 0; ind < parent.length; ind++) {
        parent[ind].right = false;
        if (index == ind) {
          parent[ind].right = true;
        }
      }
    },
  }
};

</script>
<style scoped>
.task {
  background-color: #d4ddcd;
}

.testCreated {
  color: #205d3b;
}
.modal{
  color: black;
}

.ansver {
  background-color: #dbd3d4;
}</style>
