import { prisma } from './database.server'

export async function addExpense(data: any, userId: string) {
  try {
    return await prisma.expense.create({
      data: {
        title: data.title,
        amount: +data.amount,
        date: new Date(data.date),
        User: { connect: { id: userId } }
      }
    })
  } catch (error) {
    console.error(error)
    throw new Error('couldnt add expense')
  }
}

export async function getExpenses(userId: string) {
  if (!userId) {
    throw new Error('couldnt get expenses')
  }

  try {
    const expenses = await prisma.expense.findMany({ where: { userId }, orderBy: { date: 'desc' } })
    return expenses
  } catch (error) {
    console.error(error)
    throw new Error('couldnt get expenses')
  }
}

export async function getExpense(id: string) {
  try {
    const expense = await prisma.expense.findFirst({ where: { id } })
    return expense
  } catch (error) {
    console.error(error)
    throw new Error('couldnt get expense')
  }
}

export async function udpateExpense(id: string, expenseData: any) {
  try {
    const expense = await prisma.expense.update({
      where: { id },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date)
      }
    })
    return expense
  } catch (error) {
    console.error(error)
    throw new Error('couldnt update expense')
  }
}

export async function deleteExpense(id: string) {
  try {
    const expense = await prisma.expense.delete({
      where: { id }
    })
    return expense
  } catch (error) {
    console.error(error)
    throw new Error('couldnt delete expense')
  }
}
