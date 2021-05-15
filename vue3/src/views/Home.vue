<template>
  <div class="home">
    <div>
      <h2>{{ RawData.title }}</h2>
      <h3>初始值</h3>
      <span v-for="(val, i) in RawData.arr" :key="i">-{{ val }}-</span>
      <h3>算法分类</h3>
      <ol>
        <li v-for="(item, i) in RawData.classify" :key="i">
          <strong>{{ item.type }}</strong>
          ：
          <p>{{ item.describe }}</p>
          <ul>
            <li v-for="(val, index) in item.arr" :key="index">{{ val }}</li>
          </ul>
        </li>
      </ol>
    </div>
    <div v-for="(key, index) in Object.keys(algorithm)" :key="index">
      <p>---------------------</p>
      <h3>
        {{ index + 1 }}.{{ algorithm[key].title }} -
        {{ algorithm[key].timeComplexity }} - {{ algorithm[key].stability }}
      </h3>
      <div v-if="algorithm[key].describe">
        <p>{{ algorithm[key].describe.val }}</p>
        <ul v-if="false">
          <li v-for="(val, i) in algorithm[key].describe.arr" :key="i">
            {{ val }}
          </li>
        </ul>
      </div>
      <div v-if="algorithm[key].analysis">
        <h4>分析</h4>
        <p>{{ algorithm[key].analysis }}</p>
      </div>
      <div v-if="algorithm[key].code">
        <h5>代码示例</h5>
        <xmp> {{ algorithm[key].code }}</xmp>
      </div>
      <p>
        输出：
        <span v-for="(val, i) in algorithm[key].arr" :key="i">-{{ val }}-</span>
      </p>
      <img :src="algorithm[key].img" :alt="algorithm[key].title" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue"
import bubble from "./../assets/img/suanSa/maoPao.gif"
import sequence from "./../assets/img/suanSa/xuanZe.gif"
import insert from "./../assets/img/suanSa/chaRu.gif"
import xier from "./../assets/img/suanSa/xiEr.gif"
import merger from "./../assets/img/suanSa/guiBing.gif"
import fast from "./../assets/img/suanSa/kuaiSu.gif"
import heap from "./../assets/img/suanSa/dui.gif"
import count from "./../assets/img/suanSa/jiShu.gif"
import barrel from "./../assets/img/suanSa/tong.png"
import radix from "./../assets/img/suanSa/ji-shu.gif"
export default defineComponent({
  setup() {
    const RawData = reactive({
      title: `经典算法`,
      arr: [
        3,
        44,
        38,
        5,
        47,
        15,
        36,
        26,
        27,
        2,
        46,
        4,
        19,
        50,
        48
      ],
      classify: [
        {
          type: `比较类排序`,
          describe: `不通过比较来决定元素间的相对次序，它可以突破基于比较排序的时间下界，以线性时间运行，因此也称为线性时间非比较类排序。`,
          arr: [
            "交换排序：冒泡、快速",
            "插入排序：简单插入、希尔",
            "选择排序：简单选择、堆",
            "归并排序：二路归并、多路归并"
          ]
        },
        {
          type: `非比较类排序`,
          describe: `通过比较来决定元素间的相对次序，由于其时间复杂度不能突破O(nlogn)，因此也称为非线性时间比较类排序。`,
          arr: ["计数排序", "桶排序", "基数排序"]
        }
      ]
    })
    const algorithm = reactive({
      bubble: {
        title: `冒泡排序`,
        timeComplexity: `O(n^2)`,
        stability: `稳定`,
        img: bubble,
        describe: {
          val: `冒泡排序是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。`,
          arr: [
            "比较相邻的元素。如果第一个比第二个大，就交换它们两个；",
            "对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；",
            "针对所有的元素重复以上的步骤，除了最后一个；",
            "重复步骤1~3，直到排序完成。"
          ]
        },
        analysis: ``,
        // code: `
        //         const sequenceSort = (data: number[]) => {
        //           const dataLength = data.length
        //           let minIndex
        //           let temp
        //           for (let i = 0; i < dataLength-1; i++) {
        //             minIndex = i
        //             for (let index = 0; index < dataLength; index++) {
        //               console.log(data[index], data[minIndex])
        //               if (data[index] < data[minIndex]) {
        //                 minIndex = index
        //               }
        //             }
        //             temp = data[i]
        //             data[i] = data[minIndex]
        //             data[minIndex] = temp
        //           }
        //           return data
        //         }
        // `,
        arr: [...RawData.arr]
      },
      sequence: {
        title: `选择排序`,
        timeComplexity: `O(n^2)`,
        stability: `不稳定`,
        img: sequence,
        describe: {
          val: `选择排序(Selection-sort)是一种简单直观的排序算法。它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。 `,
          arr: [
            "初始状态：无序区为R[1..n]，有序区为空；",
            "第i趟排序(i=1,2,3…n-1)开始时，当前有序区和无序区分别为R[1..i-1]和R(i..n）。该趟排序从当前无序区中-选出关键字最小的记录 R[k]，将它与无序区的第1个记录R交换，使R[1..i]和R[i+1..n)分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区；",
            "n-1趟结束，数组有序化了。"
          ]
        },
        analysis: `复杂度表现最稳定的排序算法之一，因为无论什么数据进去都是O(n^2)的时间复杂度，所以用到它的时候，数据规模越小越好。唯一的好处可能就是不占用额外的内存空间了吧。理论上讲，选择排序可能也是平时排序一般人想到的最多的排序方法了吧。`,
        arr: [...RawData.arr]
      },
      insert: {
        title: `插入排序`,
        timeComplexity: `O(n^2)`,
        stability: `稳定`,
        img: insert,
        describe: {
          val: `插入排序（Insertion-Sort）的算法描述是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入`,
          arr: [
            "从第一个元素开始，该元素可以认为已经被排序；",
            "取出下一个元素，在已经排序的元素序列中从后向前扫描；",
            "如果该元素（已排序）大于新元素，将该元素移到下一位置；",
            "重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；",
            "将新元素插入到该位置后；",
            "重复步骤2~5。"
          ]
        },
        analysis: `插入排序在实现上，通常采用in-place排序（即只需用到O(1)的额外空间的排序），因而在从后向前扫描过程中，需要反复把已排序元素逐步向后挪位，为最新元素提供插入空间。`,
        arr: [...RawData.arr]
      },
      xier: {
        title: `希尔排序`,
        timeComplexity: `O(n^2)`,
        stability: `不稳定`,
        img: xier,
        describe: {
          val: `1959年Shell发明，第一个突破平均值O(n^2)的排序算法，是简单插入排序的改进版。它与插入排序的不同之处在于，它会优先比较距离较远的元素。希尔排序又叫缩小增量排序。`,
          arr: [
            "选择一个增量序列t1，t2，…，tk，其中ti>tj，tk=1；",
            "按增量序列个数k，对序列进行k 趟排序；",
            "每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m 的子序列，分别对各子表进行直接插入排序。仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。"
          ]
        },
        analysis: `希尔排序的核心在于间隔序列的设定。既可以提前设定好间隔序列，也可以动态的定义间隔序列。动态定义间隔序列的算法是《算法（第4版）》的合著者Robert Sedgewick提出的。`,
        arr: [...RawData.arr]
      },
      merger: {
        title: `归并排序`,
        timeComplexity: `O(nlogn)`,
        stability: `稳定`,
        img: merger,
        describe: {
          val: `归并排序是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为2-路归并。`,
          arr: [
            "把长度为n的输入序列分成两个长度为n/2的子序列；",
            "对这两个子序列分别采用归并排序；",
            "将两个排序好的子序列合并成一个最终的排序序列。"
          ]
        },
        analysis: `归并排序是一种稳定的排序方法。和选择排序一样，归并排序的性能不受输入数据的影响，但表现比选择排序好的多，因为始终都是O(nlogn）的时间复杂度。代价是需要额外的内存空间。`,
        arr: [...RawData.arr]
      },
      fast: {
        title: `快速排序`,
        timeComplexity: `O(nlogn)`,
        stability: `不稳定`,
        img: fast,
        describe: {
          val: `快速排序的基本思想：通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。`,
          arr: [
            "从数列中挑出一个元素，称为 “基准”（pivot）；",
            "重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；",
            "递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。"
          ]
        },
        analysis: ``,
        arr: [...RawData.arr]
      },
      heap: {
        title: `堆排序`,
        timeComplexity: `O(nlogn)`,
        stability: `不稳定`,
        img: heap,
        describe: {
          val: `堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。`,
          arr: [
            "将初始待排序关键字序列(R1,R2….Rn)构建成大顶堆，此堆为初始的无序区；",
            "将堆顶元素R[1]与最后一个元素R[n]交换，此时得到新的无序区(R1,R2,……Rn-1)和新的有序区(Rn),且满足R[1,2…n-1]<=R[n]；",
            "由于交换后新的堆顶R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,……Rn-1)调整为新堆，然后再次将R[1]与无序区最后一个元素交换，得到新的无序区(R1,R2….Rn-2)和新的有序区(Rn-1,Rn)。不断重复此过程直到有序区的元素个数为n-1，则整个排序过程完成。"
          ]
        },
        analysis: ``,
        arr: [...RawData.arr]
      },
      count: {
        title: `计数排序`,
        timeComplexity: `O(n+k)`,
        stability: `稳定`,
        img: count,
        describe: {
          val: `计数排序不是基于比较的排序算法，其核心在于将输入的数据值转化为键存储在额外开辟的数组空间中。 作为一种线性时间复杂度的排序，计数排序要求输入的数据必须是有确定范围的整数。`,
          arr: [
            "找出待排序的数组中最大和最小的元素；",
            "统计数组中每个值为i的元素出现的次数，存入数组C的第i项；",
            "对所有的计数累加（从C中的第一个元素开始，每一项和前一项相加）；",
            "反向填充目标数组：将每个元素i放在新数组的第C(i)项，每放一个元素就将C(i)减去1。"
          ]
        },
        analysis: `计数排序是一个稳定的排序算法。当输入的元素是 n 个 0到 k 之间的整数时，时间复杂度是O(n+k)，空间复杂度也是O(n+k)，其排序速度快于任何比较排序算法。当k不是很大并且序列比较集中时，计数排序是一个很有效的排序算法。`,
        arr: [...RawData.arr]
      },
      barrel: {
        title: `桶排序`,
        timeComplexity: `O(n^2)`,
        stability: `稳定`,
        img: barrel,
        describe: {
          val: `桶排序是计数排序的升级版。它利用了函数的映射关系，高效与否的关键就在于这个映射函数的确定。桶排序 (Bucket sort)的工作的原理：假设输入数据服从均匀分布，将数据分到有限数量的桶里，每个桶再分别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排）。`,
          arr: [
            "设置一个定量的数组当作空桶；",
            "遍历输入数据，并且把数据一个一个放到对应的桶里去；",
            "对每个不是空的桶进行排序；",
            "从不是空的桶里把排好序的数据拼接起来。"
          ]
        },
        analysis: `桶排序最好情况下使用线性时间O(n)，桶排序的时间复杂度，取决与对各个桶之间数据进行排序的时间复杂度，因为其它部分的时间复杂度都为O(n)。很显然，桶划分的越小，各个桶之间的数据越少，排序所用的时间也会越少。但相应的空间消耗就会增大。`,
        arr: [...RawData.arr]
      },
      radix: {
        title: `基数排序`,
        timeComplexity: `O(n*k)`,
        stability: `稳定`,
        img: radix,
        describe: {
          val: `基数排序是按照低位先排序，然后收集；再按照高位排序，然后再收集；依次类推，直到最高位。有时候有些属性是有优先级顺序的，先按低优先级排序，再按高优先级排序。最后的次序就是高优先级高的在前，高优先级相同的低优先级高的在前`,
          arr: [
            "取得数组中的最大数，并取得位数；",
            "arr为原始数组，从最低位开始取每个位组成radix数组；",
            "对radix进行计数排序（利用计数排序适用于小范围数的特点）；"
          ]
        },
        analysis: `基数排序基于分别排序，分别收集，所以是稳定的。但基数排序的性能比桶排序要略差，每一次关键字的桶分配都需要O(n)的时间复杂度，而且分配之后得到新的关键字序列又需要O(n)的时间复杂度。假如待排数据可以分为d个关键字，则基数排序的时间复杂度将是O(d*2n) ，当然d要远远小于n，因此基本上还是线性级别的。
        基数排序的空间复杂度为O(n+k)，其中k为桶的数量。一般来说n>>k，因此额外空间需要大概n个左右。`,
        arr: [...RawData.arr]
      }
    })
    // 冒泡排序
    const bubbleSort = (data: number[]) => {
      const dataLength = data.length

      for (let i = 0; i < dataLength; i++) {
        for (let index = 0; index < dataLength - 1 - i; index++) {
          if (data[index] > data[index + 1]) {
            const temp = data[index + 1]
            data[index + 1] = data[index]
            data[index] = temp
          }
        }
      }
      return data
    }
    bubbleSort(algorithm.bubble.arr)

    // 选择排序 (还需要调试)
    function sequenceSort (data: number[]) {
      const dataLength = data.length
      let minIndex
      let temp
      for (let i = 0; i < dataLength - 1; i++) {
        minIndex = i
        for (let index = 0; index < dataLength; index++) {
          if (data[index] < data[minIndex]) {
            minIndex = index
          }
        }
        temp = data[i]
        data[i] = data[minIndex]
        data[minIndex] = temp
      }
      return data
    }
    sequenceSort(algorithm.sequence.arr)

    // 插入排序
    const insertSort = (data: number[]) => {
      const dataLength = data.length
      let preIndex
      let current
      for (let i = 1; i < dataLength; i++) {
        preIndex = i - 1
        current = data[i]
        while (preIndex >= 0 && data[preIndex] > current) {
          data[preIndex + 1] = data[preIndex]
          preIndex--
        }
        data[preIndex + 1] = current
      }
      return data
    }
    insertSort(algorithm.insert.arr)

    // 希尔排序
    const xierSort = (data: number[]) => {
      const dataLength = data.length
      for (
        let gap = Math.floor(dataLength / 2);
        gap > 0;
        gap = Math.floor(gap / 2)
      ) {
        // 注意：这里和动图演示的不一样，动图是分组执行，实际操作是多个分组交替执行
        for (let i = gap; i < dataLength; i++) {
          let j = i
          const current = data[i]
          while (j - gap >= 0 && current < data[j - gap]) {
            data[j] = data[j - gap]
            j = j - gap
          }
          data[j] = current
        }
      }
      return data
    }
    xierSort(algorithm.xier.arr)

    // 归并排序 (还需要调试)
    function merge(left: number[], right: number[]) {
      const result = []
      while (left.length > 0 && right.length > 0) {
        if (left[0] <= right[0]) {
          result.push(left.shift())
        } else {
          result.push(right.shift())
        }
      }
      while (left.length) result.push(left.shift())
      while (right.length) result.push(right.shift())
      return result
    }
    const mergerSort = (data: number[]): any => {
      const dataLength = data.length
      if (dataLength < 2) {
        return data
      }
      const middle = Math.floor(dataLength / 2)
      const left = data.slice(0, middle)
      const right = data.slice(middle)
      return merge(mergerSort(left), mergerSort(right))
    }
    mergerSort(algorithm.merger.arr)

    // 快速排序
    function partition(arr: number[], left: number, right: number) {
      // 分区操作
      const pivot = left // 设定基准值（pivot）
      let index = pivot + 1
      for (let i = index; i <= right; i++) {
        if (arr[i] < arr[pivot]) {
          swap(arr, i, index)
          index++
        }
      }
      swap(arr, pivot, index - 1)
      return index - 1
    }
    function swap(arr: number[], i: number, j: number) {
      const temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
    const fastSort = (
      data: number[],
      left: number | null,
      right: number | null
    ) => {
      const len = data.length
      let partitionIndex
      ;(left = typeof left != "number" ? 0 : left),
        (right = typeof right != "number" ? len - 1 : right)

      if (left < right) {
        partitionIndex = partition(data, left, right)
        fastSort(data, left, partitionIndex - 1)
        fastSort(data, partitionIndex + 1, right)
      }
      return data
    }
    fastSort(algorithm.fast.arr, null, null)

    // 堆排序
    let heapLen = 0
    function buildMaxHeap(arr: number[]) {
      // 建立大顶堆
      heapLen = arr.length
      for (let i = Math.floor(heapLen / 2); i >= 0; i--) {
        heapify(arr, i)
      }
    }
    function heapify(arr: number[], i: number) {
      // 堆调整
      const left = 2 * i + 1
      const right = 2 * i + 2
      let largest = i
      if (left < heapLen && arr[left] > arr[largest]) {
        largest = left
      }
      if (right < heapLen && arr[right] > arr[largest]) {
        largest = right
      }
      if (largest != i) {
        swap(arr, i, largest)
        heapify(arr, largest)
      }
    }
    const heapSort = (data: number[]) => {
      buildMaxHeap(data)
      for (let i = data.length - 1; i > 0; i--) {
        swap(data, 0, i)
        heapLen--
        heapify(data, 0)
      }
      return data
    }
    heapSort(algorithm.heap.arr)

    // 计数排序
    const countSort = (data: number[], maxValue: number) => {
      const bucket = new Array(maxValue + 1)
      let sortedIndex = 0
      const dataLength = data.length
      const bucketLen = maxValue + 1

      for (let i = 0; i < dataLength; i++) {
        if (!bucket[data[i]]) {
          bucket[data[i]] = 0
        }
        bucket[data[i]]++
      }

      for (let j = 0; j < bucketLen; j++) {
        while (bucket[j] > 0) {
          data[sortedIndex++] = j
          bucket[j]--
        }
      }

      return data
    }
    countSort(algorithm.count.arr, 200)

    // 桶排序
    const barrelSort = (data: number[], bucketSize: number | null) => {
      if (data.length === 0) {
        return data
      }

      let i
      let minValue = data[0]
      let maxValue = data[0]
      for (i = 1; i < data.length; i++) {
        if (data[i] < minValue) {
          minValue = data[i] // 输入数据的最小值
        } else if (data[i] > maxValue) {
          maxValue = data[i] // 输入数据的最大值
        }
      }

      // 桶的初始化
      const DEFAULT_BUCKET_SIZE = 5 // 设置桶的默认数量为5
      bucketSize = bucketSize || DEFAULT_BUCKET_SIZE
      const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1
      const buckets = new Array(bucketCount)
      for (i = 0; i < buckets.length; i++) {
        buckets[i] = []
      }

      // 利用映射函数将数据分配到各个桶中
      for (i = 0; i < data.length; i++) {
        buckets[Math.floor((data[i] - minValue) / bucketSize)].push(data[i])
      }

      data.length = 0
      for (i = 0; i < buckets.length; i++) {
        insertSort(buckets[i]) // 对每个桶进行排序，这里使用了插入排序
        for (let j = 0; j < buckets[i].length; j++) {
          data.push(buckets[i][j])
        }
      }
      return data
    }
    barrelSort(algorithm.barrel.arr, null)

    // 基数排序 (还需要调试)
    const counter: any = []
    const radixSort = (data: number[], maxDigit: number) => {
      let mod = 10
      let dev = 1
      for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        for (let j = 0; j < data.length; j++) {
          const bucket = parseInt(`${(data[j] % mod) / dev}`)
          if (counter[bucket] == null) {
            counter[bucket] = []
          }
          counter[bucket].push(data[j])
        }
        let pos = 0
        for (let j = 0; j < counter.length; j++) {
          let value = null
          if (counter[j] != null) {
            while ((value = counter[j].shift()) != null) {
              data[pos++] = value
            }
          }
        }
      }
      return data
    }
    radixSort(algorithm.radix.arr, 100)

    return {
      algorithm,
      RawData
    }
  }
})
</script>

<style lang="stylus" scoped>
img {
  width: 100%;
}

ul, ol, xmp {
  text-align: left;
}
</style>
